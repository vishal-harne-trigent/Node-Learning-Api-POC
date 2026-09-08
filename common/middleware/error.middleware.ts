import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error";
import logError from "../logger/log-error.util";

const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const logContext = {
        method: req.method,
        url: req.originalUrl,
    };

    if (err instanceof AppError) {
        logError(
            "Application error",
            {
                ...logContext,
                statusCode: err.statusCode,
                message: err.message,
            },
            err
        );

        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    logError(
        "Unhandled error",
        {
            ...logContext,
            statusCode: 500,
            message: err.message,
        },
        err
    );

    return res.status(500).json({
        message: "Internal server error",
    });
};

export default errorMiddleware;
