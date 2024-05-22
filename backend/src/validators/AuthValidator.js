import { BadRequestError, ForbiddenError, UnauthorizedError, ValidationError } from "../Errors.js";
import AccountService from "../services/AccountService.js";
import { isProps } from "../utils/ValidationUtils.js";

const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/,
    login: /^[a-zA-Z0-9_]{4,20}$/,
    password: /^(?=.*[A-Z])(?=.*\d).{6,100}$/
}

class AuthValidator {
    static async registration(request) {
        if(request.session?.user) {
            return new ValidationError(400, "Вы уже авторизованы.", {
                user: {
                    login: request.session?.user?.login
                }
            });
        }

        if(!isProps(request.body, ["email", "login", "password"])) {
            return new BadRequestError(400, "Не указаны все поля.");
        }

        const { email, login, password } = request.body;

        if(!email.match(patterns.email)) {
            return new ValidationError(400, "Поле 'email' не прошёл валидацию.");
        }

        if(!login.match(patterns.login)) {
            return new ValidationError(400, "Поле 'login' не прошёл валидацию.");
        }

        if(!password.match(patterns.password)) {
            return new ValidationError(400, "Поле 'password' не прошёл валидацию.");
        }

        if(await AccountService.getUserByLogin(login) != null) {
            return new ValidationError(400, "Пользователь уже зарегистрирован.");
        }

        return null;
    }

    static async login(request) {
        let result = {
            validation: null,
            client: null
        };
        
        if(request.session?.user) {
            result.validation = new ValidationError(400, "Вы уже авторизованы.", {
                user: {
                    login: request.session?.user?.login
                }
            });
            return result;
        }

        if(!isProps(request.body, ["login", "password"])) {
            result.validation = new BadRequestError(400, "Не указаны все поля.");
            return result;
        }
        
        const { login, password } = request.body;

        if(!login.match(patterns.login)) {
            result.validation = new ValidationError(400, "Поле 'login' не прошёл валидацию.");
            return result;
        }

        if(!password.match(patterns.password)) {
            result.validation = new ValidationError(400, "Поле 'password' не прошёл валидацию.");
            return result;
        }

        const client = await AccountService.getUserByLogin(login);

        if(client == null) {
            result.validation = new ValidationError(400, "Пользователь не зарегистрирован.");
            return result;
        }
        
        result.client = client;

        return result;
    }

    static logout(request) {
        if(request.session?.user == undefined) {
            return new UnauthorizedError();;
        }

        return null;
    }

    static check(request, isAdmin = false) {
        if(request.session?.user === undefined) {
            return new UnauthorizedError();
        }

        if(isAdmin && request.session.user.role !== "ADMIN") {
            return new ForbiddenError();
        }

        return null;
    }
}

export default AuthValidator;