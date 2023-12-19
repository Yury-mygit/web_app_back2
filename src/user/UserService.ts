import User_model from "../models/user/user_model";
import { CreateUserDTO, UpdateUserDTO } from "../gtos/UserDTO";

class UserService {
    async getAllStudents(skip: number, limit: number) {
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

    async createStudent(CreateUserDTO: CreateUserDTO) {
        try {
            // Convert CreateUserDTO instance to a plain object if necessary
            const userData = { ...CreateUserDTO };
            const student = await User_model.create(userData);
            console.log(student)
            return student;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateStudent(updateStudentDTO: UpdateUserDTO) {
        try {
            const { user_id, ...updateData } = updateStudentDTO;
            await User_model.update(updateData, { where: { id: user_id } });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteStudent(studentId: number) {
        try {
            await User_model.destroy({ where: { id: studentId } });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new UserService();