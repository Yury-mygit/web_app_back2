import User_model from "./user_model";
import UserAttributes from "../../interface/user_interface";
import { Request, Response } from 'express';
import UserService from './UserService';
import { CreateUserDTO, UpdateUserDTO } from './UserDTO';

type PartialUserAttributes = Pick<UserAttributes, 'user_id' | 'name' | 'surname' | 'telegram_id'>;

class UserController {
    private userService= UserService;

    constructor(userService: typeof UserService) { // Inject userService through the constructor
        this.userService = userService;
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

    async createUser(req: Request, res: Response) {
        // console.log("====================================================")
        // console.log(req)
        try {
            const createStudentDTO = new CreateUserDTO({
                ...req.body,
                dateOfInitialDiagnosis: Date.now()
            });
            // console.log(createStudentDTO)
            const user = await this.userService.createUser(createStudentDTO)
            res.status(201).json(user);
        } catch (error: any) {
            // console.log("Error in createUser: ", error)
            res.status(500).json({ error: error.message });
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


export default new UserController(UserService);





















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

