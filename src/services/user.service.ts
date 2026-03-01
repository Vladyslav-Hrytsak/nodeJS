import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interface/token.interface";
import {
  IUser,
  IUserListQuery,
  IUserListResponse,
} from "../interface/user.interface";
import { userPresenter } from "../presenters /user.presenter";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(query: IUserListQuery): Promise<IUserListResponse> {
    const [entities, total] = await userRepository.getList(query);
    return userPresenter.toListResDto(entities, total, query);
  }
  public async getByID(id: string): Promise<IUser> {
    const user = await userRepository.getByID(id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getByID(jwtPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async putMe(jwtPayload: ITokenPayload, dto: IUser): Promise<IUser> {
    const updatedUser = await userRepository.putByID(jwtPayload.userId, dto);

    return updatedUser;
  }
  public async delMe(jwtPayload: ITokenPayload): Promise<boolean> {
    return await userRepository.delByID(jwtPayload.userId);
  }
  public async uploadAvatar(
    jwtPayload: ITokenPayload,
    file: UploadedFile,
  ): Promise<IUser> {
    const user = await userRepository.getByID(jwtPayload.userId);
    const avatar = await s3Service.uploadFile(
      file,
      FileItemTypeEnum.USER,
      user._id,
    );
    const updateUser = await userRepository.putByID(user._id, { avatar });
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return updateUser;
  }

  public async deleteAvatar(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getByID(jwtPayload.userId);
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
      return await userRepository.putByID(user._id, { avatar: null });
    }
    return user;
  }
}

export const userService = new UserService();
