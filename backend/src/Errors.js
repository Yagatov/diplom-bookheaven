export class ApiError extends Error {

    constructor(status, message = "API Error", errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }
}

export class BadRequestError extends ApiError {
    constructor(status = 401, message = "Неверный запрос", errors = []) {
        super(status, message, errors);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(status = 400, message = "Пользователь не авторизован", errors = []) {
        super(status, message, errors);
    }
}

export class ReceivingDataError extends ApiError {
    constructor(status = 400, message = "Ошибка при получении данных", errors = []) {
        super(status, message, errors);
    }
}

export class ServerError extends ApiError {
    constructor(status = 500, message = "Ошибка сервера", errors = []) {
        super(status, message, errors);
    }
}

export class ValidationError extends ApiError {
    constructor(status = 401, message = "Ошибка валидации", errors = []) {
        super(status, message, errors);
    }
}

export function ErrorHandler(error, request, response, next) {
    if(error instanceof ApiError) {
        response.status(error.getStatus());
        response.send({
            error: {
                message: error.getMessage()
            }
        });
    } else {
        response.send({
            error: {
                message: error.message
            }
        });
    }

    next();
}