import ShopService from "../services/ShopService.js";
import AccountValidator from "../validators/AccountValidator.js";

class AdminController {
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
            res.status(500).send({
                message: 'error'
            })
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
            res.status(500).send({
                message: 'error'
            })
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
            res.status(500).send({
                message: 'error'
            })
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
            res.status(500).send({
                message: 'error'
            })
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
            res.status(500).send({
                message: 'error'
            })
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
            res.status(500).send({
                message: 'error'
            })
        }
    }

    static async createProduct(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            await ShopService.createProduct(req.body?.name, req.body?.author, req.body?.image, parseFloat(req.body?.price), req.body?.status);

            res.send({
                message: "OK"
            })
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message: 'error'
            })
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
            res.status(500).send({
                message: 'error'
            })
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
            res.status(500).send({
                message: 'error'
            })
        }
    }

    static async updateProduct(req, res, next) {
        const auth = AccountValidator.isAuth(req, true);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const { name, author, image, price, status, categories } = req.body;
        try {
            await ShopService.updateProduct(Number(req.params.id), name, author, image, parseFloat(price), status, categories);

            res.send({
                message: "OK"
            })
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message: 'error'
            })
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
            res.status(500).send({
                message: 'error'
            })
        }
    }
}
export default AdminController;