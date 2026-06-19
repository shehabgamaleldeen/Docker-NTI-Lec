export const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const createConflictError = (message) => createError(message, 409);
export const createUnauthorizedError = (message) => createError(message, 401);
export const createBadRequestError = (message) => createError(message, 400);
export const createNotFoundError = (message) => createError(message, 404);
export const createInternalServerError = (message) => createError(message, 500);
