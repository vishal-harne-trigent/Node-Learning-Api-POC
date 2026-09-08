import User, { UserCreationAttributes } from "./user.model";
import { USER_ATTRIBUTES } from "../../common/constants/constants";
import { UserInput, UserStatus } from "./user.types";

const findAll = async () => {
    return await User.findAll({
        attributes: [...USER_ATTRIBUTES],
        order: [["id", "ASC"]],
    });
};

const findById = async (id: number) => {
    return await User.findByPk(id, { attributes: [...USER_ATTRIBUTES] });
};

const findByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
};

const create = async (userData: UserCreationAttributes) => {
    const user = await User.create(userData);
    return await findById(user.id);
};

const updateById = async (id: number, userData: UserInput) => {
    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    await user.update(userData);
    return await findById(id);
};

const updateStatusById = async (id: number, status: UserStatus) => {
    return await updateById(id, { status });
};

const deleteById = async (id: number) => {
    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    await user.destroy();
    return true;
};

export default {
    findAll,
    findById,
    findByEmail,
    create,
    updateById,
    updateStatusById,
    deleteById,
};
