import { ApiError } from "../errors/api-error";
import { IUser } from "../model/UserModel";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async create(dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters long",
        400,
      );
    }

    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }

    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters long",
        400,
      );
    }
    return await userRepository.create(dto);
  }

  public async getByID(id: number): Promise<IUser> {
    const user = await userRepository.getByID(id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async putByID(id: number, dto: IUser): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters long",
        400,
      );
    }

    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }

    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters long",
        400,
      );
    }
    const existingUser = await userRepository.getByID(id);

    if (!existingUser) {
      throw new ApiError("User not found", 404);
    }

    const updatedUser = await userRepository.putByID(id, dto);

    return updatedUser;
  }
  public async delByID(id: number): Promise<IUser> {
    const user = await userRepository.delByID(id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
}

export const userService = new UserService();
