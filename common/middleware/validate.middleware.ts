import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import logError from "../logger/log-error.util";

type ValidationTarget = "body" | "params" | "query";

type ValidationSchema = Partial<Record<ValidationTarget, ZodType>>;

const validate = (schemas: ValidationSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: Record<string, string[]> = {};

        for (const target of ["body", "params", "query"] as ValidationTarget[]) {
            const schema = schemas[target];

            if (!schema) {
                continue;
            }

            const result = schema.safeParse(req[target]);

            if (!result.success) {
                Object.assign(errors, result.error.flatten().fieldErrors);
                continue;
            }

            req[target] = result.data;
        }

        if (Object.keys(errors).length > 0) {
            logError("Validation failed", {
                method: req.method,
                url: req.originalUrl,
                statusCode: 400,
                errors,
            });

            return res.status(400).json({
                message: "Validation failed",
                errors,
            });
        }

        next();
    };
};

export default validate;
