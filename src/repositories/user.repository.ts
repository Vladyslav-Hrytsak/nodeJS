import { IUser } from "../interface/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find({});
  }
  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }
  public async getByID(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
  public async putByID(id: string, dto: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, dto, { new: true });
  }
  public async delByID(id: string): Promise<boolean> {
    const result = await User.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}

export const userRepository = new UserRepository();
