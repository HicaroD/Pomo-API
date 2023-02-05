import { Router } from "express";
import userController from "../controllers/user.controller.js";
import globalMiddlewares from "../middlewares/global.middlewares.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", authMiddleware.auth, userController.getUser);
router.get("/all", userController.findAll);
router.post("/create/", globalMiddlewares.areUniqueCredentials, userController.create);
router.patch(
  "/update/:id/",
  authMiddleware.auth,
  globalMiddlewares.isValidId,
  globalMiddlewares.isValidUser,
  userController.update
);
router.delete(
  "/remove/:id/",
  authMiddleware.auth,
  globalMiddlewares.isValidId,
  globalMiddlewares.isValidUser,
  userController.remove
);

export default router;
