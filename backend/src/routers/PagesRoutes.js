import { Router } from 'express';

import PagesController from "../controllers/PagesController.js";

const router = new Router();

router.get('/home', PagesController.home);
router.get('/category/:id', PagesController.category);
router.get('/search', PagesController.search);

export default router;