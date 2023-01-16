import {Router} from 'express';
import userController from '../controllers/user.controller.js';
import globalMiddlewares from '../middlewares/global.middlewares.js';

const router = Router();

router.get("/", userController.findAll);
router.post("/create", userController.create);
router.get("/:id", globalMiddlewares.isValidId, globalMiddlewares.isValidUser, userController.findById);
router.patch("/update/:id", globalMiddlewares.isValidId, globalMiddlewares.isValidUser, userController.update);
router.delete("/remove/:id", globalMiddlewares.isValidId, globalMiddlewares.isValidUser, userController.remove);

export default router;
