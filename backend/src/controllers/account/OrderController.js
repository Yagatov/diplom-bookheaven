import AuthValidator from '../../validators/AuthValidator.js';

import OrderService from "../../services/account/OrderService.js";
import CartService from "../../services/account/CartService.js";
import AccountService from "../../services/AccountService.js";
import { isProps } from "../../utils/ValidationUtils.js";

import { BadRequestError, ReceivingDataError, ServerError } from '../../Errors.js';

class OrderController {
    static async create(req, res, next) {
        console.log("[D?] OrderController.create");

        const auth = AuthValidator.check(req);
        if(auth) return next(auth);

        if(!isProps(req.body, ["bonus"])) {
            return next(new BadRequestError(400, "Не указаны все поля."));
        }

        const { bonus: useBonus } = req.body;

        const user_id = req.session.user.id;

        const { bonus } = await AccountService.getUserById(user_id)
        const carts = await CartService.get(user_id);
        const products = carts.products;

        if(products.length === 0) return next(new ReceivingDataError());
        if(useBonus > bonus) return next(new BadRequestError(400, 'Недопустимое значение bonus'));

        carts.totalPrice -= useBonus;

        const resultBonus = {
            give: carts.totalBonus,
            take: parseInt(useBonus)
        }

        try {
            await OrderService.create(user_id, products, carts.totalPrice, resultBonus);
            await CartService.delete(user_id);
            await AccountService.updateBonus(user_id, bonus - useBonus); // + carts.totalBonus
            res.send();
        } catch(error) {
            console.log(error)
            return next(new ServerError());
        }
    }

    static async getAll(req, res, next) {
        console.log("[D?] OrderController.getAll");
        const auth = AuthValidator.check(req);
        if(auth) return next(auth);

        try {
            const result = await OrderService.get(req.session.user.id);

            res.send(result);
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async getOne(req, res, next) {
        console.log("[D?] OrderController.getOne");
        const auth = AuthValidator.check(req);
        if(auth) return next(auth);

        const order_id = Number(req.params?.id);
        const user_id = req.session.user.id;

        try {
            const result = await OrderService.getOne(user_id, order_id);

            res.send(result);
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }
}
export default OrderController;