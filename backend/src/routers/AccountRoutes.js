import { Router } from 'express';

import AccountController from "../controllers/AccountController.js";

const router = new Router();

router.get('/profile', AccountController.profile);
router.post('/profile', AccountController.setProfile);
router.get('/basket', AccountController.cart);
router.post('/basket/product', AccountController.addProductToCart);
router.delete('/basket/product/:id', AccountController.removeProductFromCart);
router.post('/order', AccountController.order);
router.get('/orders', AccountController.orders);

export default router;