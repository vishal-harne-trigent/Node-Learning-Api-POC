import { AppError } from "../../common/errors/app.error";
import userRepository from "./user.repository";
import { UserCreationAttributes } from "./user.model";
import { UpdateUserStatusInput, UserInput } from "./user.types";

const getUsers = async () => {
    return await userRepository.findAll();
};

const getUserById = async (id: number) => {
    const user = await userRepository.findById(id);

    if (!user) {
        throw AppError.notFound("User not found");
    }

    return user;
};

const createUser = async (userData: UserInput) => {
    return await userRepository.create(userData as UserCreationAttributes);
};

const updateUser = async (id: number, userData: UserInput) => {
    const updatedUser = await userRepository.updateById(id, userData);

    if (!updatedUser) {
        throw AppError.notFound("User not found");
    }

    return updatedUser;
};

const patchUser = async (id: number, userData: UserInput) => {
    const updatedUser = await userRepository.updateById(id, userData);

    if (!updatedUser) {
        throw AppError.notFound("User not found");
    }

    return updatedUser;
};

const updateUserStatus = async (id: number, { status }: UpdateUserStatusInput) => {
    const updatedUser = await userRepository.updateStatusById(id, status);

    if (!updatedUser) {
        throw AppError.notFound("User not found");
    }

    return updatedUser;
};

const deleteUser = async (id: number) => {
    const deleted = await userRepository.deleteById(id);

    if (!deleted) {
        throw AppError.notFound("User not found");
    }
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
