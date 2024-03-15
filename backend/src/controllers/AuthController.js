import { ServerError, ValidationError } from "../Errors.js";
import AuthService from "../services/AuthService.js";

import AuthValidator from "../validators/AuthValidator.js";


class AuthController {
    static async registration(req, res, next) {
        const { validate, error: validateError } = await AuthValidator.registration(req);
        
        if(!validate) {
            return next(validateError);
        }

        const { email, login, password } = req.body;

        const { client, error: resultError} = await AuthService.registration(email, login, password);

        if(resultError !== null) {
            return next(resultError);
        }

        req.session.user = {
            id: client?.id,
            login,
            role: client?.role
        }

        res.send({
            status: "OK",
            message: "Успешная регистрация",
            user: {
                login
            }
        });
        
    }

    static async login(req, res, next) {
        const { validate, error: validateError, client } = await AuthValidator.login(req);
        
        if(!validate) {
            return next(validateError);
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
            status: "OK",
            message: "Успешная авторизация",
            user: {
                login
            }
        });
    }

    static async logout(req, res, next) {
        const { validate, error: validateError } = await AuthValidator.logout(req);
        
        if(!validate) {
            return next(validateError);
        }

        delete req.session?.user;

        res.send({
            status: "OK",
            message: "Успешный выход"
        })
    }
}

export default AuthController;