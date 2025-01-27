// node-practice/src/models/messageModel.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../../db/sequelize';
import UserModel from './userModel';

class MessageModel extends Model {
    public id!: number;
    public content!: string;
    public userId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public user?: UserModel;
};

MessageModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'messages',
    },
);

MessageModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

export default MessageModel