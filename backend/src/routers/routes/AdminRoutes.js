import Routes from "../Routes.js";

import AdminController from "../../controllers/AdminController.js";

class AdminRoutes extends Routes {
    _register() {
        this.router.get('/dashboard', AdminController.dashboard)

        this.router.get('/categories', AdminController.categories);
        this.router.post('/category', AdminController.createCategory);
        this.router.delete('/category/:id', AdminController.deleteCategory);
        this.router.post('/category/:id', AdminController.updateCategory);
        this.router.put('/category/:id/status/:status', AdminController.updateStatusCategory);

        this.router.get('/products', AdminController.products);
        this.router.post('/product', AdminController.createProduct);
        this.router.delete('/product/:id', AdminController.deleteProduct);
        this.router.post('/product/:id', AdminController.updateProduct);
        this.router.put('/product/:id/status/:status', AdminController.updateStatusProduct);

        this.router.get('/orders', AdminController.orders);
        this.router.get('/order/:id', AdminController.order);
        this.router.post('/order/:id/status', AdminController.orderStatus);

        this.router.get('/users', AdminController.users);
        this.router.get('/user/:id', AdminController.user);
        this.router.post('/user/:id/role', AdminController.userRole);
        
        this.router.get('/messages', AdminController.messages);
    }
}

export default AdminRoutes;