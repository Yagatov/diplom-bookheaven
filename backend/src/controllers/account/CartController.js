import AuthValidator from '../../validators/AuthValidator.js';

import ShopService from "../../services/ShopService.js";
import { ServerError } from '../../Errors.js';

class CartController {
    static async getAll(req, res, next) {
        console.log("[D?] CartController.getAll");
        const auth = AuthValidator.check(req);
        if(auth) next(auth);

        try {
            const result = await ShopService.getCart(req.session.user.id);

            res.send(result);
        } catch(error) {
            return next(new ServerError());
        }
    }

    static async addOne(req, res, next) {
        console.log("[D?] CartController.addOne");
        const auth = AuthValidator.check(req);
        if(auth) next(auth);

        const user_id = req.session.user.id;
        const product_id = Number(req.params?.id);

        try {
            const result = await ShopService.addProductToCart(user_id, product_id);

            res.send(result);
        } catch(error) {
            return next(new ServerError());
        }
    }

    static async removeOne(req, res, next) {
        console.log("[D?] CartController.removeOne");
        const auth = AuthValidator.check(req);
        if(auth) next(auth);

        const user_id = req.session.user.id;
        const product_id = Number(req.params?.id);

        try {
            const result = await ShopService.removeProductFromCart(user_id, product_id);

            res.send(result);
        } catch(error) {
            return next(new ServerError());
        }
    }

    static async deleteOne(req, res, next) {
        console.log("[D?] CartController.deleteOne");
        const auth = AuthValidator.check(req);
        if(auth) next(auth);

        const user_id = req.session.user.id;
        const product_id = Number(req.params?.id);

        try {
            await ShopService.deleteProductFromCart(user_id, product_id);

            res.send({ message: "OK" });
        } catch(error) {
            return next(new ServerError());
        }
    }
}
export default CartController;