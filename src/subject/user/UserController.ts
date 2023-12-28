import UserAttributes from "./user_interface";
import { Request, Response } from 'express';
import { UpdateUserDTO } from './UserDTO';
import { IAPI } from "../../servises/api";
import {IStore} from "../../servises/store";

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
    createUser(data:string, target:string):Promise<void>
    updateUser(updateStudentDTO: UpdateUserDTO):Promise<void>
    updateUser_s(data: string, target: string):Promise<void>
    deleteUser(userId: number):Promise<void>
    validateUser(data:string, target:string):void
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
    private a:any

    constructor({ userService, api , store}: { userService: IUserService, api: IAPI , store: IStore}) {
        this.userService = userService;
        this.api = api;
        this.store = store


        this.store.setData('api',this.api)

        this.userService.configureStore(this.store)
        this.api.connectStore(this.store)

        this.store.subscribe((key, oldValue, newValue) => {

            this.a = newValue
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
        // 1. Initialize to store for this request and save data
        this.store.setMultipleData({"res":res, 'rawData':req.body, 'prepData':{}, 'resultData':{} })

        // 2 Validate data from
        this.userService.validateUser('rawData','prepData')

        // 3. Save to database
        await this.userService.createUser('prepData', 'resultData')

        // 4. maker response
        await this.api.success("res",'resultData')


        // console.log(this.store.getData('prepData'))
    }


    async updateUser(req: Request, res: Response) {

        //Initialize to store for this request and save data
        this.store.setMultipleData({"res":res, 'up_rawData':req.body, 'up_prepData':{}, 'up_resultData':{} })

        // Validate data from
        this.userService.validateUser('up_rawData','up_prepData')

        // Save to database
        this.userService.updateUser_s('up_prepData','up_rawData')

        // Saker response


        // try {
        //     const updateStudentDTO = new UpdateUserDTO(req.body);
        //     await this.userService.updateUser(updateStudentDTO);
        //     res.json({ message: 'Student updated successfully' });
        // } catch (error: any) {
        //     res.status(500).json({ error: error.message });
        // }
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
