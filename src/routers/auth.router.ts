import { Router } from "express";

import { authController } from "../controller/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { validateMiddleware } from "../middlewares/validate.middelware";
import {
  changePassword,
  signInValidator,
  signUpValidator,
} from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  validateMiddleware.isIdValid(signUpValidator),
  authController.signUp,
);
router.post(
  "/sign-in",
  validateMiddleware.isIdValid(signInValidator),
  authController.signIn,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post("/logout", authController.logout);

router.post("/logout-all", authController.logoutAll);

router.post("/forgot-password", authController.forgotPasswordSendEmail);
router.put(
  "/forgot-password",
  authMiddleware.checkActionToken,
  authController.forgotPasswordSet,
);
router.post(
  "/change-password",
  commonMiddleware.isBodyValid(changePassword),
  authMiddleware.checkAccessToken,
  authController.changePassword,
);

router.put(
  "/verify",
  authMiddleware.checkVerifyToken,
  authController.verifyUser,
);

export const authRouter = router;
