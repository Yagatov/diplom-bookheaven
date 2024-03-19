import { Router } from 'express';

import AdminController from "../controllers/AdminController.js";

const router = new Router();

router.get('/categories', AdminController.categories);
router.post('/category', AdminController.createCategory);
router.delete('/category/:id', AdminController.deleteCategory);
router.post('/category/:id', AdminController.updateCategory);
router.put('/category/:id/status/:status', AdminController.updateStatusCategory);

router.get('/products', AdminController.products);
router.post('/product', AdminController.createProduct);
router.delete('/product/:id', AdminController.deleteProduct);
router.post('/product/:id', AdminController.updateProduct);
router.put('/product/:id/status/:status', AdminController.updateStatusProduct);

router.get('/orders', AdminController.orders);

export default router;