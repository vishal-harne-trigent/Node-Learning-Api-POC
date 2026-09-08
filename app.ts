import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import { AppError } from "./common/errors/app.error";
import errorMiddleware from "./common/middleware/error.middleware";
import requestLogger from "./common/middleware/request.middleware";

const app = express();
app.use(express.json());
app.use(requestLogger);
app.get("/", (_req, res) => {
    res.send("Node JS API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((_req, _res, next) => {
    next(AppError.notFound("Route not found"));
});

app.use(errorMiddleware);

export default app;
