import {Router} from 'express';
import create from '../controllers/user.controller.js';

const router = Router();

router.post("/create", create);

export default router;
