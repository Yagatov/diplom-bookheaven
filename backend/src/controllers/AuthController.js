import { ServerError, ValidationError } from "../Errors.js";
import AuthService from "../services/AuthService.js";

import AuthValidator from "../validators/AuthValidator.js";


class AuthController {
    static async registration(req, res, next) {
        console.log("[D?] AuthController.registration");
        const validation = await AuthValidator.registration(req);
        
        if(validation) {
            return next(validation);
        }

        const { email, login, password } = req.body;

        let result = {
            message: 'Вы зарегистрировались',
            user: {
                login
            }
        };

        let client = {}

        try {
            client = await AuthService.registration(email, login, password);
        } catch(error) {
            console.log('[error] Catching in AuthController.registration');
            return next(new ServerError());
        }
        req.session.user = {
            id: client?.id,
            login,
            role: client?.role
        };

        res.send(result);
    }

    static async login(req, res, next) {
        console.log("[D?] AuthController.login");
        const { validation, client } = await AuthValidator.login(req);
        
        if(validation) {
            return next(validation);
        }

        const { login, password } = req.body;

        if(client.password !== password) {
            return next(new ValidationError(400, "Неверный пароль"));
        }

        req.session.user = {
            id: client?.id,
            login,
            role: client?.role
        }

        res.send({
            message: "Вы авторизовались",
            user: {
                login
            }
        });
    }

    static async logout(req, res, next) {
        console.log("[D?] AuthController.logout");
        const validation = await AuthValidator.logout(req);
        
        if(validation) {
            return next(validation);
        }

        delete req.session.user;

        res.send({
            message: "Вы вышли с аккаунта"
        });
    } 

    static async check(req, res, next) {
        console.log("[D?] AuthController.check");
        if(req.session?.user == undefined) {
            return res.send({
                message: "Вы не авторизованы",
                auth: false
            });
        }
        
        res.send({
            message: "Вы авторизованы",
            auth: true,
            user: {
                login: req.session.user.login
            }
        });
    }
}

export default AuthController;