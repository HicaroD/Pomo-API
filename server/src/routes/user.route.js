import {Router} from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

router.get("/", userController.findAll);
router.post("/create", userController.create);
router.patch("/update/:id", userController.update);
router.delete("/remove/:id", userController.remove);

export default router;
