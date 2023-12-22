import User_model from "./user_model";
import UserAttributes from "./user_interface";
import { Request, Response } from 'express';
import UserService from './UserService';
import { CreateUserDTO, UpdateUserDTO } from './UserDTO';
import API from "../../servises/api";
import {th} from "@faker-js/faker";

type PartialUserAttributes = Pick<UserAttributes, 'user_id' | 'name' | 'surname' | 'telegram_id'>;

class UserController {
    private userService= UserService;
    private api = API
    constructor(userService: typeof UserService, api:typeof API) { // Inject userService through the constructor
        this.userService = userService;
        this.api = api;
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

     // createUser = async (req: Request, res: Response) =>
     //     this.api.success(res, this.userService.createUser({ ...req.body as Partial<UserAttributes>}))

    createUser = async (req: Request, res: Response) =>{
        try {
            await this.api.success(res, this.userService.createUser({...req.body as Partial<UserAttributes>}))
        }catch (e){
            await this.api.error(res, e)
        }

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


export default new UserController(UserService, API);





















// class UserController {
//     async getAllStudents(req:any, res:any, next:any){
//         try {
//             const skip = parseInt(req.query.skip as string) || 0;
//             const limit = parseInt(req.query.limit as string) || 100;
//             const user_id = parseInt(req.query.user_id as string) || -1;
//
//             const fields: (keyof PartialUserAttributes)[] = ['user_id', 'name', 'surname', 'telegram_id'];
//
//             const students = await User_model.findAll({
//                 offset: skip,
//                 limit: limit,
//                 order:['user_id'],
//                 attributes: fields
//             });
//
//             res.json(students);
//         } catch (err) {
//             if (err instanceof Error) {
//                 res.status(500).json({ error: err.message });
//             } else {
//                 res.status(500).json({ error: 'An unknown error occurred' });
//             }
//         }
//     }
//
//     async createStudent(req:any, res:any, next:any){
//         const tempdata = {
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             parentsName: req.body.firstName,
//             age: req.body.age,
//             status: 'active',
//             sessionTransferRate: 0.05,
//             percentageOfAbsences: 0.02,
//             contactEmail: req.body.contactEmail,
//             contactTelephone: req.body.contactTelephone,
//             dateOfInitialDiagnosis: req.body.dateOfInitialDiagnosis,
//             address: req.body.address
//         }
//
//         try {
//             const studentData = req.body;
//             const student = await User_model.create(tempdata);
//             res.json(student.id);
//         } catch (err: any) {
//             res.status(500).json(err)
//         }
//     }
//
//     async updateStudent(req:any, res:any, next:any){
//         const tempdata = {
//
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             parentsName: req.body.firstName,
//             age: req.body.age,
//             status: 'active',
//             sessionTransferRate: 0.05,
//             percentageOfAbsences: 0.02,
//             contactEmail: req.body.contactEmail,
//             contactTelephone: req.body.contactTelephone,
//             dateOfInitialDiagnosis: req.body.dateOfInitialDiagnosis,
//             address: req.body.address
//         }
//
//         try {
//             const studentId = req.body.id;
//             await User_model.update(tempdata, { where: { id: studentId } });
//             res.json({ message: 'User_model updated successfully' });
//         } catch (err: any) {
//             res.status(500).json(err)
//         }
//     }
//
//     async deleteStudent(req:any, res:any, next:any){
//         try {
//             const studentId = req.params.id;
//             await User_model.destroy({ where: { id: studentId } });
//             res.json({ message: 'User_model deleted successfully' });
//         } catch (err: any) {
//             res.status(500).json(err)
//         }
//     }
// }

