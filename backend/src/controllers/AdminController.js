import ShopService from "../services/ShopService.js";
import AccountValidator from "../validators/AccountValidator.js";

class AdminController {
    static async dashboard(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            const result = await ShopService.getDataDashboard();

            res.send(result);
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async categories(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            const result = await ShopService.getCategories();

            res.send({
                categories: result
            })
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async createCategory(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            await ShopService.createCategory(req.body?.name, req.body?.navigation, req.body?.sets, req.body?.status);

            res.send({
                message: "OK"
            })
        } catch(error) {
            return next(new ServerError());
        }
    }

    static async deleteCategory(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            await ShopService.deleteCategory(Number(req.params.id));

            res.send({
                message: "OK"
            })
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async updateStatusCategory(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            await ShopService.updateStatusCategory(Number(req.params.id), req.params.status);

            res.send({
                message: "OK"
            })
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async updateCategory(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const { name, navigation, sets, status } = req.body;
        try {
            await ShopService.updateCategory(Number(req.params.id), name, navigation, sets, status);

            res.send({
                message: "OK"
            })
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }
    
    static async products(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            const result = await ShopService.getProducts();

            res.send({
                products: result
            })
        } catch(error) {
            return next(new ServerError());
        }
    }

    static async createProduct(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            await ShopService.createProduct(req.body?.name, req.body?.author, req.body?.image, parseFloat(req.body?.price), parseInt(req.body?.bonus), req.body?.status);

            res.send()
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async deleteProduct(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            await ShopService.deleteProduct(Number(req.params.id));

            res.send({
                message: "OK"
            })
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async updateStatusProduct(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            // await ShopService.updateStatusProduct(Number(req.params.id), req.params.status);

            res.send({
                message: "NULL"
            })
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async updateProduct(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const { name, author, image, price, bonus, status, categories } = req.body;
        try {
            await ShopService.updateProduct(Number(req.params.id), name, author, image, parseFloat(price), parseInt(bonus), status, categories);

            res.send({
                message: "OK"
            })
        } catch(error) {
            console.log(error);
            return next(new ServerError()); 
        }
    }

    static async orders(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            const result = await ShopService.getAllOrders();

            res.send(result)
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async order(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const order_id = Number(req.params?.id);

        try {
            const result = await ShopService.getOrder(order_id);

            res.send(result)
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async orderStatus(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const order_id = Number(req.params?.id);
        const { status } = req.body;

        try {
            const result = await ShopService.setOrderStatus(order_id, status);

            if(!result.bonus_completed && result.bonus_give != 0 && result.status == 'completed') {
                await ShopService.giveOrderBonus(order_id, result.user_id, result.user.bonus + result.bonus_give)
                console.log(true);
            }

            res.send(result);
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async users(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            const result = await ShopService.getAllUsers();

            res.send(result)
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async user(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const user_id = Number(req.params?.id);

        try {
            const result = await ShopService.getUser(user_id);

            res.send(result)
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async userRole(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const user_id = Number(req.params?.id);
        const { role } = req.body;

        try {
            const result = await ShopService.setUserRole(user_id, role);

            res.send(result);
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }

    static async messages(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            const result = await ShopService.getAllMessages();

            res.send(result)
        } catch(error) {
            console.log(error);
            return next(new ServerError());
        }
    }
}
export default AdminController;