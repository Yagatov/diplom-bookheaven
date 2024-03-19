import { status } from "@prisma/client";
import { ValidationError } from "../Errors.js";
import AuthService from "../services/AuthService.js";

import AuthValidator from "../validators/AuthValidator.js";


class AuthController {
    static async registration(req, res, next) {
        const { validate, error: validateError } = await AuthValidator.registration(req);
        
        if(!validate) {
            if(validateError.getMessage() == "Пользователь уже авторизован.") {
                res.status(401).send({
                    status: "OK",
                    message: "Пользователь был уже авторизован",
                    user: {
                        login: req.session?.user?.login
                    }
                });
                return;
            }
            return next(validateError);
        }

        const { email, login, password } = req.body;

        const { client, error: resultError} = await AuthService.registration(email, login, password);

        if(resultError !== null) {
            console.log(resultError)
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
            if(validateError.getMessage() == "Пользователь уже авторизован.") {
                res.send({
                    status: "OK",
                    message: "Пользователь был уже авторизован",
                    user: {
                        login: req.session?.user?.login
                    }
                });
                return;
            }

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

    static async check(req, res, next) {
        if(req.session?.user == undefined) {
            res.send({
                status: "OK",
                auth: false
            });
        } else {
            res.send({
                status: "OK",
                auth: true,
                user: {
                    login: req?.session?.user?.login
                }
            });
        }
    }
}

export default AuthController;