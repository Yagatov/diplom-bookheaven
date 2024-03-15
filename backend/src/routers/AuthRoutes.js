import { Router } from 'express';

import AuthController from "../controllers/AuthController.js";

const router = new Router();

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

export default router;