import { config } from "../config/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interface/token.interface";
import {
  IChangePassword,
  IResetPasswordSend,
  IResetPasswordSet,
  ISignIn,
  IUser,
} from "../interface/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { oldPasswordRepository } from "../repositories/old-password.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { sendGridService } from "./send-grid.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });

    const verifyToken = tokenService.generateResetToken(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.VERIFY,
    );
    await actionTokenRepository.create({
      token: verifyToken,
      type: ActionTokenTypeEnum.VERIFY,
      _userId: user._id,
    });
    await sendGridService.sendByType(user.email, EmailTypeEnum.WELCOME, {
      name: dto.name,
      frontUrl: config.FRONT_URL,
      actionToken: verifyToken,
    });

    return { user, tokens };
  }

  public async signIn(
    dto: ISignIn,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async refresh(refreshToken: string) {
    const payload = tokenService.verifyToken(
      refreshToken,
      TokenTypeEnum.REFRESH,
    );
    if (!payload) {
      throw new ApiError("Refresh token is not valid", 404);
    }
    const storedToken = await tokenRepository.findByParams({
      refreshToken,
    });
    if (!storedToken) {
      throw new ApiError("Refresh token not found", 401);
    }

    const user = await userRepository.getByID(payload.userId);
    if (!user) {
      throw new ApiError("User for refresh token not find", 404);
    }
    await tokenRepository.deleteById(storedToken._id as string);
    const tokenPair = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({
      _userId: user._id,
      ...tokenPair,
    });
    return tokenPair;
  }
  public async logout(refreshToken: string) {
    const payload = tokenService.verifyToken(
      refreshToken,
      TokenTypeEnum.REFRESH,
    );

    if (!payload) {
      throw new ApiError("Refresh token is not valid", 401);
    }
    const storedToken = await tokenRepository.findByParams({
      refreshToken,
    });

    if (!storedToken) {
      throw new ApiError("Refresh token not found", 401);
    }

    await tokenRepository.deleteById(storedToken._id as string);
  }
  public async logoutAll(accessToken: string) {
    const payload = tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS);
    if (!payload) {
      throw new ApiError("Refresh token is not valid", 404);
    }
  }

  public async forgotPasswordSendEmail(dto: IResetPasswordSend): Promise<void> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 401);
    }
    const token = tokenService.generateResetToken(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.FORGOT_PASSWORD,
    );
    await actionTokenRepository.create({
      token,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
      _userId: user._id,
    });
    await sendGridService.sendByType(user.email, EmailTypeEnum.RESET_PASSWORD, {
      name: user.name,
      frontUrl: config.FRONT_URL,
      actionToken: token,
    });
  }

  public async forgotPasswordSet(
    dto: IResetPasswordSet,
    jwtPayload: ITokenPayload,
  ): Promise<void> {
    const user = await userRepository.getByID(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isSameAsCurrent = await passwordService.comparePassword(
      dto.password,
      user.password,
    );

    if (isSameAsCurrent) {
      throw new ApiError("New password must differ from current password", 409);
    }

    const oldPasswords = await oldPasswordRepository.getByUserId(
      jwtPayload.userId,
    );

    for (const oldPass of oldPasswords) {
      const isSame = await passwordService.comparePassword(
        dto.password,
        oldPass.password,
      );

      if (isSame) {
        throw new ApiError(
          "You cannot reuse one of your previous passwords",
          409,
        );
      }
    }

    await oldPasswordRepository.create({
      _userId: jwtPayload.userId,
      password: user.password,
    });

    const hashedPassword = await passwordService.hashPassword(dto.password);

    await userRepository.putByID(jwtPayload.userId, {
      password: hashedPassword,
    });

    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
    });
  }

  public async changePassword(
    jwtPayload: ITokenPayload,
    dto: IChangePassword,
  ): Promise<void> {
    const user = await userRepository.getByID(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ApiError("Invalid previous password", 401);
    }

    const isSameAsCurrent = await passwordService.comparePassword(
      dto.newPassword,
      user.password,
    );

    if (isSameAsCurrent) {
      throw new ApiError("New password must differ from current password", 409);
    }

    const oldPasswords = await oldPasswordRepository.getByUserId(
      jwtPayload.userId,
    );

    for (const oldPass of oldPasswords) {
      const isSame = await passwordService.comparePassword(
        dto.newPassword,
        oldPass.password,
      );

      if (isSame) {
        throw new ApiError(
          "You cannot reuse one of your previous passwords",
          409,
        );
      }
    }

    await oldPasswordRepository.create({
      _userId: jwtPayload.userId,
      password: user.password,
    });

    const hashedPassword = await passwordService.hashPassword(dto.newPassword);

    await userRepository.putByID(jwtPayload.userId, {
      password: hashedPassword,
    });
    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
    });
  }

  public async verifyUser(jwtPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getByID(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    if (user.isVerified) {
      throw new ApiError("User already verified", 400);
    }

    await userRepository.verifyUser(jwtPayload.userId);

    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.VERIFY,
    });
  }
}

export const authService = new AuthService();
