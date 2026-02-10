import * as jsonwebtoken from "jsonwebtoken";

import { config } from "../config/config";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interface/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jsonwebtoken.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRATION as any,
    });
    const refreshToken = jsonwebtoken.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRATION as any,
    });
    return { accessToken, refreshToken };
  }

  public verifyToken(token: string): ITokenPayload {
    try {
      return jsonwebtoken.verify(
        token,
        config.JWT_ACCESS_SECRET,
      ) as ITokenPayload;
    } catch (err) {
      throw new ApiError("Unable to verify token", 401);
      console.log(err);
    }
  }
}

export const tokenService = new TokenService();
