export class ApiError extends Error {
    constructor(status, message = "API Error", fields = null) {
        super(message);
        this.status = status;
        this.fields = fields;
        this.setType("ApiError");
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }

    getFields() {
        return this.fields;
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }
}

export class BadRequestError extends ApiError {
    constructor(status = 400, message = "Неверный запрос", fields = null) {
        super(status, message, fields);
        this.setType("BadRequestError");
    }
}

export class UnauthorizedError extends ApiError {
    constructor(status = 401, message = "Пользователь не авторизован", fields = null) {
        super(status, message, fields);
        this.setType("UnauthorizedError");
    }
}

export class ReceivingDataError extends ApiError {
    constructor(status = 400, message = "Ошибка при получении данных", fields = null) {
        super(status, message, fields);
        this.setType("ReceivingDataError");
    }
}

export class ServerError extends ApiError {
    constructor(status = 500, message = "Ошибка сервера", fields = null) {
        super(status, message, fields);
        this.setType("ServerError");
    }
}

export class ValidationError extends ApiError {
    constructor(status = 400, message = "Ошибка валидации", fields = null) {
        super(status, message, fields);
        this.setType("ValidationError");
    }
}

export class ForbiddenError extends ApiError {
    constructor(status = 403, message = "Нет доступа", fields = null) {
        super(status, message, fields);
        this.setType("ForbiddenError");
    }
}

export function ErrorHandler(error, request, response, next) {
    if(error instanceof ApiError) {
        response.status(error.getStatus());
        response.send({
            error: {
                type: error.getType(),
                message: error.getMessage(),
                fields: error.getFields()
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