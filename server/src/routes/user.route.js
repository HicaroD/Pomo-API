import {Router} from 'express';
import userController from '../controllers/user.controller.js';
import globalMiddlewares from '../middlewares/global.middlewares.js';
import authMiddleware from '../middlewares/auth.middlewares.js';

const router = Router();

// TODO: format this code
router.get("/", userController.findAll);
router.post("/create", userController.create);
router.get("/:id", globalMiddlewares.isValidId, globalMiddlewares.isValidUser, userController.findById);
router.patch("/update/:id", authMiddleware.auth, globalMiddlewares.isValidId, globalMiddlewares.isValidUser, userController.update);
router.delete("/remove/:id", authMiddleware.auth, globalMiddlewares.isValidId, globalMiddlewares.isValidUser, userController.remove);

export default router;
