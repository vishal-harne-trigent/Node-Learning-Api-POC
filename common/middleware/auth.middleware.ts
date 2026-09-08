import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logError from "../logger/log-error.util";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const logContext = {
        method: req.method,
        url: req.originalUrl,
    };

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logError("Unauthorized", {
            ...logContext,
            statusCode: 401,
            message: "Missing or invalid authorization header",
        });

        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        logError("JWT secret is not configured", {
            ...logContext,
            statusCode: 500,
        });

        return res.status(500).json({ message: "JWT secret is not configured" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as {
            id: number;
            email: string;
        };

        req.user = decoded;
        next();
    } catch (error) {
        logError(
            "Invalid or expired token",
            {
                ...logContext,
                statusCode: 401,
                message: error instanceof Error ? error.message : "Token verification failed",
            },
            error instanceof Error ? error : undefined
        );

        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;
