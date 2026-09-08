import { Request, Response } from "express";
import authService from "./auth.service";

const register = async (req: Request, res: Response) => {
    const { name, email, password, phoneNumber } = req.body;

    const user = await authService.register({
        name,
        email,
        password,
        phoneNumber,
    });
    res.status(201).json(user);
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });
    res.status(200).json(result);
};

export default {
    register,
    login,
};
