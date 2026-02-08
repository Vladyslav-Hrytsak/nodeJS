import { reader, write } from "../fs.service";
import { IUser } from "../model/UserModel";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await reader();
  }
  public async create(dto: Partial<IUser>): Promise<IUser> {
    const users = await reader();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };

    users.push(newUser);
    await write(users);
    return newUser;
  }
  public async getByID(id: number): Promise<IUser | null> {
    const users = await reader();
    return users.find((u: any) => u.id === id);
  }
}

export const userRepository = new UserRepository();
