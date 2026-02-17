import { EmailTypeEnum } from "../enums/email-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair } from "../interface/token.interface";
import { ISignIn, IUser } from "../interface/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
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
    await emailService.sendMail(EmailTypeEnum.WELCOME, "vlad.123jj@gmail.com", {
      name: user.name,
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
    const user = await userRepository.getByID(payload.userId);

    await tokenRepository.deleteById(storedToken._id as string);
    await emailService.sendMail(EmailTypeEnum.LOGOUT, "vlad.123jj@gmail.com", {
      name: user.name,
    });
  }
  public async logoutAll(accessToken: string) {
    const payload = tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS);
    if (!payload) {
      throw new ApiError("Refresh token is not valid", 404);
    }
    const user = await userRepository.getByID(payload.userId);

    await tokenRepository.deleteManyByUserId(payload.userId);
    await emailService.sendMail(EmailTypeEnum.LOGOUT, "vlad.123jj@gmail.com", {
      name: user.name,
    });
  }
}

export const authService = new AuthService();
