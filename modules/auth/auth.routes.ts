import express from "express";
import authController from "./auth.controller";
import validate from "../../common/middleware/validate.middleware";
import { loginSchema, registerSchema } from "./auth.schema";

const router = express.Router();

router.post("/register", validate({ body: registerSchema }), authController.register);
router.post("/login", validate({ body: loginSchema }), authController.login);

export default router;
