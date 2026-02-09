import { Router } from "express";

import { userController } from "../controller/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);
router.get("/:id", commonMiddleware.isIdValid("id"), userController.getById);
router.put("/:id", userController.putById);
router.delete("/:id", userController.delById);

export const userRouter = router;
