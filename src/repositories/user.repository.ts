import * as mongoose from "mongoose";

import { IUser, IUserListQuery } from "../interface/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(query: IUserListQuery): Promise<[IUser[], number]> {
    const filterObject: mongoose.QueryFilter<IUser> = { isVerified: true };
    if (query.search) {
      filterObject.name = { $redex: query.search, options: "i" };
      // filterObject.$or = [
      //   { name: { $regex: query.search, $options: "i" } },
      //   { email: { $regex: query.search, $options: "i" } },
      // ];
    }
    const skip = query.limit * (query.page - 1);
    return await Promise.all([
      User.find(filterObject).limit(query.limit).skip(skip),
      User.countDocuments(filterObject),
    ]);
  }
  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }
  public async getByID(id: string): Promise<IUser | null> {
    return await User.findById(id).select("+password");
  }
  public async putByID(id: string, dto: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, dto, { new: true });
  }
  public async delByID(id: string): Promise<boolean> {
    const result = await User.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }
  public async verifyUser(id: string): Promise<void> {
    await User.findByIdAndUpdate(id, { isVerified: true });
  }

  public async getInactiveUsers(activeIds: string[]): Promise<IUser[]> {
    return await User.find({
      _id: { $nin: activeIds },
    });
  }

  public async unsetAvatar(userId: string): Promise<IUser> {
    return await User.findByIdAndUpdate(
      userId,
      { $unset: { avatar: "" } },
      { new: true },
    ).lean();
  }
}

export const userRepository = new UserRepository();
