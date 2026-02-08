import { NextFunction, Request, Response } from "express";

import { IUser } from "../model/UserModel";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = userService.getList;
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const result = await userService.getByID(userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
