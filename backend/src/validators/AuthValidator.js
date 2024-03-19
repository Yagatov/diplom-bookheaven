import { ValidationError } from "../Errors.js";
import AccountService from "../services/AccountService.js";
import { isProps } from "../utils/ValidationUtils.js";

const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/,
    login: /^[a-zA-Z0-9_]{4,20}$/,
    password: /^(?=.*[A-Z])(?=.*\d).{6,100}$/
}

class AuthValidator {
    static async registration(request) {
        const validation = {
            validate: true,
            error: null
        }

        if(request.session?.user) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Пользователь уже авторизован.");
            return validation;
        }

        if(!isProps(request.body, ["email", "login", "password"])) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Не указаны все поля.");
            return validation;
        }

        const { email, login, password } = request.body;

        if(!email.match(patterns.email)) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Поле 'email' не прошёл валидацию.");
            return validation;
        }

        if(!login.match(patterns.login)) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Поле 'login' не прошёл валидацию.");
            return validation;
        }

        if(!password.match(patterns.password)) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Поле 'password' не прошёл валидацию.");
            return validation;
        }

        if(await AccountService.getUserByLogin(login) != null) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Пользователь уже зарегистрирован.");
            return validation;
        }

        return validation;
    }

    static async login(request) {
        const validation = {
            validate: true,
            error: null
        }

        if(request.session?.user != undefined) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Пользователь уже авторизован.");
            return validation;
        }


        if(!isProps(request.body, ["login", "password"])) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Не указаны все поля.");
            return validation;
        }
        
        const { login, password } = request.body;

        if(!login.match(patterns.login)) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Поле 'login' не прошёл валидацию.");
            return validation;
        }

        if(!password.match(patterns.password)) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Поле 'password' не прошёл валидацию.");
            return validation;
        }

        const result = await AccountService.getUserByLogin(login);

        if(result == null) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Пользователь не зарегистрирован.");
            return validation;
        }

        validation.client = result;
        return validation;
    }

    static async logout(request) {
        const validation = {
            validate: true,
            error: null
        }

        if(request.session?.user == undefined) {
            validation.validate = false;
            validation.error = new ValidationError(401, "Пользователь не авторизован.");
            return validation;
        }

        return validation;
    }
}

export default AuthValidator;