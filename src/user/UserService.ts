import User_model from "../models/user/user_model";
import { CreateUserDTO, UpdateUserDTO } from "./UserDTO";

class UserService {
    async getAllUsers(skip: number, limit: number) {
        try {
            const students = await User_model.findAll({
                offset: skip,
                limit: limit,
                order: ['user_id']
            });
            return students;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createUser(CreateUserDTO: CreateUserDTO) {
        try {
            // Convert CreateUserDTO instance to a plain object if necessary
            const userData = { ...CreateUserDTO };
            const student = await User_model.create(userData);
            // console.log(student)
            return student;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateUser(updateStudentDTO: UpdateUserDTO) {
        try {
            const { user_id, ...updateData } = updateStudentDTO;
            await User_model.update(updateData, { where: { id: user_id } });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteUser(userId: number) {
        try {
            await User_model.destroy({ where: { user_id: userId } });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new UserService();