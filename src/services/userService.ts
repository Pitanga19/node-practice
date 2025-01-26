// node-practice/src/services/userService

import UserModel from "../models/userModel";

class UserService {
    static async create(username: string): Promise<UserModel> {
        try {
            const user = await UserModel.create({ username: username });
            return user;
        } catch (error) {
            throw new Error('Error creating user');
        };
    };

    static async get(id: number): Promise<UserModel | null> {
        try {
            const user = await UserModel.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        };
    };

    static async getAll(): Promise<UserModel[]> {
        try {
            const users = await UserModel.findAll();
            return users;
        } catch (error) {
            throw new Error('Error fetching all users');
        }
    };

    static async update(id: number, newUsername: string): Promise<UserModel> {
        try {
            const user = await UserModel.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            user.username = newUsername;
            await user.save();
            return user;
        } catch (error) {
            throw new Error('Error updating user');
        };
    };

    static async delete(id: number): Promise<void> {
        try {
            const user = await UserModel.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            await user.destroy();
        } catch (error) {
            throw new Error('Error deleting user');
        };
    };
};

export default UserService;