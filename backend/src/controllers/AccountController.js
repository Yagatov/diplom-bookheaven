import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import AccountValidator from "../validators/AccountValidator.js";
import AccountService from "../services/AccountService.js";

import ShopService from "../services/ShopService.js";

import { publicAvaDir } from '../../public.js';

class AccountController {
    static async profile(req, res, next) {
        const auth = AccountValidator.isAuth(req);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const { id, email, login, role, bonus, avatar } = await AccountService.getUserById(req.session?.user?.id);

        res.send({
            id,
            email,
            login,
            role,
            bonus,
            avatar
        });
    }

    static async setProfile(req, res, next) {
        const auth = AccountValidator.isAuth(req);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const { email: newEmail, login: newLogin } = req.body;
        const ava = req.files?.ava;
        let avatar = undefined;

        if(ava != undefined) {
            try {
                avatar = uuidv4() + path.extname(ava.name);
                ava.mv(path.join(publicAvaDir, avatar));
            } catch(error) {
                console.log(error);
                return res.status(500).send({
                    message: error.message
                })
            }
        }

        try {
            const { id, email, login, role } = await AccountService.updateUser(req.session?.user?.id, newLogin, newEmail, avatar);

            req.session.user = {
                id,
                login,
                role
            }
            
            res.status(200).send({
                message: 'ok',
                user: {
                    login
                }
            });
        } catch (error) {
            return res.status(500).send({
                message: 'Ошибка сервера',
            });
        }
    }

    static async cart(req, res, next) {
        const auth = AccountValidator.isAuth(req);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            const result = await ShopService.getCart(req.session?.user?.id);

            res.send(result);
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message: 'error'
            })
        }
    }

    static async addProductToCart(req, res, next) {
        const auth = AccountValidator.isAuth(req);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const { product_id } = req.body;

        try {
            const result = await ShopService.addProductToCart(req.session?.user?.id, Number(product_id));

            res.send(result);
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message: 'error'
            })
        }
    }

    static async removeProductFromCart(req, res, next) {
        const auth = AccountValidator.isAuth(req);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        try {
            const result = await ShopService.removeProductFromCart(Number(req.params?.id));

            res.send(result);
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message: 'error'
            })
        }
    }

    static async order(req, res, next) {
        const auth = AccountValidator.isAuth(req);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const { price } = req.body;

        try {
            const result = await ShopService.createOrder(Number(req.session?.user?.id), Number(price));
            await ShopService.deleteCart(Number(req.session?.user?.id));

            res.send(result);
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message: 'error'
            })
        }
    }

    static async orders(req, res, next) {
        const auth = AccountValidator.isAuth(req);
    
        if(!auth.validate) {
            return next(auth.error);
        }

        const { price } = req.body;

        try {
            const result = await ShopService.getOrders(Number(req.session?.user?.id));

            res.send(result);
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message: 'error'
            })
        }
    }
}
export default AccountController;