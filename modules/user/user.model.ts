import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db/postgres/sequelize";

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string | null;
    phoneNumber: string | null;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes
    extends Optional<
        UserAttributes,
        "id" | "password" | "phoneNumber" | "status" | "createdAt" | "updatedAt"
    > {}

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string | null;
    declare phoneNumber: string | null;
    declare status: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "active",
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,
    }
);

export default User;
