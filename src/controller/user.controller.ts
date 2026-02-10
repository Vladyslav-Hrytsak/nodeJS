import { NextFunction, Request, Response } from "express";

import { IUser } from "../interface/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const result = await userService.getByID(userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  public async putById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const dto = req.body as IUser;
      const result = await userService.putByID(userId, dto);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
  public async delById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;

      const isDeleted = await userService.delByID(userId);

      if (!isDeleted) {
        return res
          .status(404)
          .json({ message: "User not found or already deleted" });
      }

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
