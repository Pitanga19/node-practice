// node-practice/src/models/messageModel.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../../db/sequelize';

class MessageModel extends Model {
    public id!: number;
    public content!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
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
    },
    {
        sequelize,
        tableName: 'messages',
    },
);

export default MessageModel