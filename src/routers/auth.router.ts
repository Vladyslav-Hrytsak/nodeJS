import { Router } from "express";

import { authController } from "../controller/auth.controller";
import { validateMiddleware } from "../middlewares/validate.middelware";
import { validationSchema } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  validateMiddleware.isIdValid(validationSchema),
  authController.signUp,
);
router.post(
  "/sign-in",
  // validateMiddleware.isIdValid(validationSchema),
  authController.signIn,
);

export const authRouter = router;
