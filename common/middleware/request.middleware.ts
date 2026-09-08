import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        logger.info(`${req.method} ${req.originalUrl}`, {
            statusCode: res.statusCode,
            duration: `${duration}ms`,
        });
    });

    next();
};

export default requestLogger;
