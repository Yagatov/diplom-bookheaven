import Routes from "../Routes.js";

import ProfileController from "../../controllers/account/ProfileController.js";
import CartController from "../../controllers/account/CartController.js";
import OrderController from "../../controllers/account/OrderController.js";
import MessageController from "../../controllers/account/MessageController.js";

class AccountRoutes extends Routes {
    _register() {
        this.router.get('/profile', ProfileController.get);
        this.router.post('/profile', ProfileController.set);

        this.router.get('/cart', CartController.getAll);
        this.router.post('/cart/product/:id/add', CartController.addOne);
        this.router.post('/cart/product/:id/remove', CartController.removeOne);
        this.router.post('/cart/product/:id/delete', CartController.deleteOne);

        this.router.post('/order', OrderController.create);
        this.router.get('/orders', OrderController.getAll);
        this.router.get('/order/:id', OrderController.getOne);

        this.router.post('/message', MessageController.create);
    }
}

export default AccountRoutes;