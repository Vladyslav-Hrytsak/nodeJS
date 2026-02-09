import { Router } from "express";

import { userController } from "../controller/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { validateMiddleware } from "../middlewares/validate.middelware";
import { validationSchema } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.post(
  "/",
  validateMiddleware.isIdValid(validationSchema),
  userController.create,
);
router.get("/:id", commonMiddleware.isIdValid("id"), userController.getById);
router.put(
  "/:id",
  validateMiddleware.isIdValid(validationSchema),
  commonMiddleware.isIdValid("id"),
  userController.putById,
);
router.delete("/:id", commonMiddleware.isIdValid("id"), userController.delById);

export const userRouter = router;
