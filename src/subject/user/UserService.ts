import User_model from "./user_model";
import { CreateUserDTO, UpdateUserDTO } from "./UserDTO";
import UserAttributes from "./user_interface";
import {th} from "@faker-js/faker";
import CreateUserFactory from "./CreateUserFactory";


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

    async getOneUser(payload: Partial<UserAttributes>) {

        const options = {
            where:{}
        }

        if (payload.user_id) {
            options.where = {
                user_id: payload.user_id
            };
        } else {
            options.where = {
                telegram_id: payload.telegram_id
            };
        }

        try {
            const user = await User_model.findOne(options);
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createUser(CreateUserDTOData: Partial<UserAttributes>) {
        try {
            const userData: Partial<UserAttributes> = CreateUserFactory.create(CreateUserDTOData);
            const createUserDTO: Partial<UserAttributes> = new CreateUserDTO(userData);
            const user = await User_model.create(createUserDTO);

            return {
                user_id: user.user_id,
                name: user.name,
                surname: user.surname,
                age: user.age,
                status: user.status,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

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