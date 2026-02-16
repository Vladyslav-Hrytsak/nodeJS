import { Router } from "express";

import { userController } from "../controller/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { validateMiddleware } from "../middlewares/validate.middelware";
import { signUpValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.get("/:me", authMiddleware.checkAccessToken, userController.getMe);
router.put(
  "/:me",
  authMiddleware.checkAccessToken,
  validateMiddleware.isIdValid(signUpValidator),
  userController.putMe,
);
router.delete("/:me", authMiddleware.checkAccessToken, userController.delMe);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
export const userRouter = router;
