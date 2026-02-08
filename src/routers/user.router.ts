import { Router } from "express";

import { userController } from "../controller/user.controller";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);
router.get("/:id", userController.getById);

export const userRouter = router;
