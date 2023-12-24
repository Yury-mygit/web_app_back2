import UserAttributes from "./user_interface";
import { Request, Response } from 'express';
import UserService from './UserService';
import { CreateUserDTO, UpdateUserDTO } from './UserDTO';
import API_, {APIResponse, IAPI} from "../../servises/api";
import Log, {run} from "../../servises/debug";
import {IStore} from "../../servises/store";

// const API = new API_(new APIResponse())

export interface IUserController{
    getAllUser(req: Request, res: Response):void
    getOneUser(req: Request,  res: Response):void
    createUser(req: Request, res: Response):void
    updateUser(req: Request, res: Response):void
    deleteUser(req: Request, res: Response):void
}

export interface IUserService{
    getAllUsers(skip: number, limit: number):Promise<Partial<UserAttributes>[]>
    getOneUser(payload: Partial<UserAttributes>):Promise<Partial<UserAttributes>>
    createUser(data:string, target:string):void
    updateUser(updateStudentDTO: UpdateUserDTO):Promise<void>
    deleteUser(userId: number):Promise<void>

    configureStore(ws:IStore):void
}

export interface IUserWorkspace {
    setData(key: string, data: any):void;
    getData(key: string):any;
    getAllKeys():string[];
    setMultipleData(keyValuePairs: Record<string, any>): void;
}

class UserController implements IUserController{
    private userService:IUserService;
    private api: IAPI
    private store: IStore

    constructor({ userService, api , store}: { userService: IUserService, api: IAPI , store: IStore}) {
        this.userService = userService;
        this.api = api;
        this.store = store

        this.userService.configureStore(this.store)
        this.store.subscribe((key, oldValue, newValue) => {
            // console.log(`Change detected for key "${key}": from`, oldValue, 'to', newValue);
            // Perform any asynchronous action here
            if (key == 'status') console.log(key, "  ", newValue)
        });
    }
    async getAllUser(req: Request, res: Response) {
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 100;
            const students = await this.userService.getAllUsers(skip, limit);
            res.json(students);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOneUser(req: Request,  res: Response) {
        res.json(await this.userService.getOneUser(req.body as Partial<UserAttributes>))
    }

    createUser = async (req: Request, res: Response) =>{

        /*
        1. Initialize to store for this request and save data
        2. Save to database
        3. maker response
         */

        const payload:Partial<UserAttributes> = req.body

        this.store.setMultipleData({"res":res, 'data':payload, 'result':{}})
        this.userService.createUser('data', "result")
        this.api.success("res",'sd')
        // await run(this.userService.createUser, this.userService, 'data', "result")


        // try {
        //     await this.api.success(res, this.userService.createUser({...req.body as Partial<UserAttributes>}))
        // }catch (e){
        //     await this.api.error(res, e)
        // }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const updateStudentDTO = new UpdateUserDTO(req.body);
            await this.userService.updateUser(updateStudentDTO);
            res.json({ message: 'Student updated successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            await this.userService.deleteUser(userId);
            res.json({ message: 'Student deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}


export default UserController;
