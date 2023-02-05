import { Router } from "express";
import userController from "../controllers/user.controller.js";
import globalMiddlewares from "../middlewares/global.middlewares.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", authMiddleware.auth, userController.getUser);
router.get("/all", userController.findAll);
router.patch(
  "/update/",
  authMiddleware.auth,
  globalMiddlewares.isValidId,
  globalMiddlewares.isValidUser,
  userController.update
);
router.delete(
  "/remove/",
  authMiddleware.auth,
  globalMiddlewares.isValidId,
  globalMiddlewares.isValidUser,
  userController.remove
);

export default router;
