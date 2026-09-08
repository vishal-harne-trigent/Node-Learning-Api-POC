import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../common/errors/app.error";
import userRepository from "../user/user.repository";
import { LoginInput, RegisterInput } from "./auth.types";

const register = async ({
    name,
    email,
    password,
    phoneNumber,
}: RegisterInput) => {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
        throw AppError.conflict("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
    });

    return user;
};

const login = async ({ email, password }: LoginInput) => {
    const user = await userRepository.findByEmail(email);

    if (!user || !user.password) {
        throw AppError.unauthorized("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw AppError.unauthorized("Invalid email or password");
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw AppError.internal("JWT secret is not configured");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
        expiresIn: "1d",
    });

    const safeUser = await userRepository.findById(user.id);

    return { token, user: safeUser };
};

export default {
    register,
    login,
};
