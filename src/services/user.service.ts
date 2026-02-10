import { ApiError } from "../errors/api-error";
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

  public async putByID(id: string, dto: IUser): Promise<IUser> {
    const updatedUser = await userRepository.putByID(id, dto);

    return updatedUser;
  }
  public async delByID(id: string): Promise<boolean> {
    return await userRepository.delByID(id);
  }
}

export const userService = new UserService();
