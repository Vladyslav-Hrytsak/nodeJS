import { Router } from "express";

import { authController } from "../controller/auth.controller";
import { validateMiddleware } from "../middlewares/validate.middelware";
import { signInValidator, signUpValidator } from "../validators/user.validator";

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
router.post("/refresh", authController.refresh);

router.post("/logout", authController.logout);

router.post("/logout-all", authController.logoutAll);

export const authRouter = router;
