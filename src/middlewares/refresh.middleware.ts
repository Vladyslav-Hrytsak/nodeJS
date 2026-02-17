import { NextFunction, Request, Response } from "express";

import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class RefreshMiddleware {
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("Token is not provided", 401);
      }

      const refreshToken = header.split("Bearer ")[1];

      const payload = tokenService.verifyToken(
        refreshToken,
        TokenTypeEnum.REFRESH,
      );

      const tokenPair = await tokenRepository.findByParams({ refreshToken });

      if (!tokenPair) {
        throw new ApiError("Refresh token is not valid", 401);
      }

      res.locals.jwtPayload = payload;
      res.locals.tokenPair = tokenPair;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const refreshMiddleware = new RefreshMiddleware();
