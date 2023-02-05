import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import globalMiddlewares from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/signin", authController.signIn);
router.post("/signUp/", globalMiddlewares.areUniqueCredentials, authController.signUp);

export default router;
