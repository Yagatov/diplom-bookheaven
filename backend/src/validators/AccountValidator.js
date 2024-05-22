import { ValidationError } from "../Errors.js";

class AccountValidator {
    static isAuth(request, isAdmin = false) {
        const validation = {
            validate: true,
            error: null
        }

        if(
            request?.session?.user == null ||
            request?.session?.user == undefined ||
            request?.session?.user?.login == undefined
        ) {
            validation.validate = false;
            validation.error = new ValidationError(403, "Пользователь не авторизован.");
            return validation;
        }

        if(isAdmin && request.session.user?.role != "ADMIN") {
            validation.validate = false;
            validation.error = new ValidationError(403, "Нет прав.");
            return validation;
        }

        return validation;
    }
}

export default AccountValidator;