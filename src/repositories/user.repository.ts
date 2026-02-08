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
    return users.find((u: IUser) => u.id === id);
  }
  public async putByID(id: number, dto: Partial<IUser>): Promise<IUser | null> {
    const users = await reader();
    const index = users.findIndex((u: IUser) => u.id === id);
    users[index] = {
      ...users[index],
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };

    await write(users);
    return users[index];
  }
  public async delByID(id: number): Promise<IUser | null> {
    const users = await reader();
    const filteredUsers = users.filter((u: IUser) => u.id !== id);
    await write(filteredUsers);
    return users.find((u: IUser) => u.id === id);
  }
}

export const userRepository = new UserRepository();
