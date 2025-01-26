// node-practice/src/models/userModel.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../../db/sequelize';

class UserModel extends Model {
    public id!: number;
    public username!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
};

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
            // unique: true, // not now
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
    },
);

export default UserModel;