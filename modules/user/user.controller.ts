import { Request, Response } from "express";
import userService from "./user.service";

const getUsers = async (_req: Request, res: Response) => {
    const users = await userService.getUsers();
    res.status(200).json(users);
};

const getUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    res.status(200).json(user);
};

const createUser = async (req: Request, res: Response) => {
    const { name, email, phoneNumber, status } = req.body;
    const newUser = await userService.createUser({
        name,
        email,
        phoneNumber,
        status,
    });
    res.status(201).json(newUser);
};

const updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, email, phoneNumber, status } = req.body;
    const updatedUser = await userService.updateUser(id, {
        name,
        email,
        phoneNumber,
        status,
    });
    res.status(200).json(updatedUser);
};

const patchUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updatedUser = await userService.patchUser(id, req.body);
    res.status(200).json(updatedUser);
};

const updateUserStatus = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { status } = req.body;
    const updatedUser = await userService.updateUserStatus(id, { status });
    res.status(200).json(updatedUser);
};

const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await userService.deleteUser(id);
    res.status(200).json({
        message: "User deleted successfully",
    });
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    updateUserStatus,
    deleteUser,
};
