import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "./model/UserModel";

export const reader = async (): Promise<IUser[]> => {
  try {
    const pathToFile = path.join(__dirname, "..", "db.json");
    const data = await fs.readFile(pathToFile, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Помилка читання", e);
    return [];
  }
};

export const write = async (users: IUser[]): Promise<void> => {
  try {
    const pathToFile = path.join(__dirname, "..", "db.json");
    await fs.writeFile(pathToFile, JSON.stringify(users));
  } catch (e) {
    console.log("Помилка запису", e);
  }
};
