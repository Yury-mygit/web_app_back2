import User_model from "./user_model";
import { CreateUserDTO, UpdateUserDTO } from "./UserDTO";
import UserAttributes from "./user_interface";
import {IUserService} from "./UserController";
import {IStore} from "../../servises/store";
import Log from "../../servises/debug";

export interface ICreateUserFactory{
    create( payload: Partial<UserAttributes> ):Partial<UserAttributes>
}

class UserService implements IUserService{

    private store !:IStore
    private factory : ICreateUserFactory

    constructor(factory: ICreateUserFactory) {
        this.factory = factory
    }

    public configureStore = (ws:IStore)=>{
        this.store = ws
    }
    async getAllUsers(skip: number, limit: number): Promise<Partial<UserAttributes>[]> {
        try {
            const students = await User_model.findAll({
                offset: skip,
                limit: limit,
                order: [['user_id', 'ASC']] // Corrected order syntax
            });
            return students;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getOneUser(payload: Partial<UserAttributes>):Promise<Partial<UserAttributes>> {

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
            if (!user) throw new Error('There is no user with user id =' + payload.user_id)
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    validateUser = (data: string, target: string) => {

        const data_:Partial<UserAttributes> = this.store.getData(data)

        const createUserDTO: Partial<UserAttributes> = new CreateUserDTO(data_);
        const userData: Partial<UserAttributes> = this.factory.create(createUserDTO);

        this.store.setData(target, userData)
    }
    async createUser(data: string, target: string):Promise<void>{

        console.time()

        const data_: Partial<UserAttributes> = this.store.getData(data)

        try {
            const user:Partial<UserAttributes> = await User_model.create(data_);
            // console.log(this.store)
            this.store.setData(target, {
                user_id: user.user_id,
                name: user.name,
                surname: user.surname,
                age: user.age,
                status: user.status,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            })

        } catch (error: any) {
            throw new Error(error.message);
        }
        console.timeEnd()

    }

    async updateUser(updateStudentDTO: UpdateUserDTO):Promise<void> {
        try {
            const { user_id, ...updateData } = updateStudentDTO;
            await User_model.update(updateData, { where: { id: user_id } });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteUser(userId: number):Promise<void> {
        try {
            await User_model.destroy({ where: { user_id: userId } });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default UserService;