import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interface/token.interface";
import { IUser } from "../interface/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
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
}

export const userService = new UserService();
