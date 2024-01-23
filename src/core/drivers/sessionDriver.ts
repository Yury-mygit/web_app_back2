import BaseDriver, {IBaseEntity} from "./baseDriver";
import {ICreateUserFactory} from "../factories/UserFactory";
import {ICreateUserDTO} from "../DTO/UserDTO";
import {IUserModel} from "../models/user_model";
import {Request, Response} from "express";
import {PartialSessionAttributes} from "../interfas/session_interfases";
import SessionModel, {ServiceType, Status} from "../models/session_model";
import {validationResult} from "express-validator";

interface ISessionDriver extends IBaseEntity{
    factory : ICreateUserFactory | undefined
    dto: ICreateUserDTO | undefined;
    model: any

    takeOne (req: Request, res: Response):Promise<void>;
    takeMany(req: Request, res: Response):Promise<void>;
    create(req: Request, res: Response) : Promise<void>;
    update(req: Request, res: Response) : Promise<void>;
    delete(req:Request, res: Response): Promise<void>;
}


export class SessionDriver extends BaseDriver implements ISessionDriver {
    public factory !: ICreateUserFactory | undefined
    public dto !: ICreateUserDTO | undefined
    public model !: any

    constructor({
                    factory,
                    dto,
                    model,
                    // answerFilter
                }: ConstructorParams ) {
        super();
        this.factory = factory ||undefined
        this.dto = dto || undefined
        this.model = model || undefined
    }

    public takeOne =  async (req: Request, res: Response):Promise<void> => {};
    public takeMany =  async  (req: Request, res: Response):Promise<void> => {
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 100;
            const user_id = req.query.user_id ? parseInt(req.query.user_id as string) : null;

            const fields: (keyof PartialSessionAttributes)[] = ["session_id", "user_id", "paid"];

            const options: any = {
                offset: skip,
                limit: limit,
                order: ['session_id'],
                attributes: fields
            };

            // If user_id is provided, add a where clause to filter by user_id
            if (user_id) {
                options.where = { user_id: user_id };
            }

            const sessions = await SessionModel.findAll(options);

            res.json(sessions);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    };
    public create =  async (req: Request, res: Response) : Promise<void> => {
        const tempdata = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            parentsName: req.body.firstName,
            age: req.body.age,
            status: 'active',
            sessionTransferRate: 0.05,
            percentageOfAbsences: 0.02,
            contactEmail: req.body.contactEmail,
            contactTelephone: req.body.contactTelephone,
            dateOfInitialDiagnosis: req.body.dateOfInitialDiagnosis,
            address: req.body.address
        }

        try {
            const studentData = req.body;
            const student = await SessionModel.create(tempdata);
            res.json(student.id);
        } catch (err: any) {
            res.status(500).json(err)
        }
    };
    public update =  async (req: Request, res: Response) : Promise<void> => {
        const { body } = req;
        const validationRules = {
            id: 'number',
            startDateTime: 'string',
            duration: 'number',
            week_first_day: 'string',
            online: 'boolean',
            paid: 'boolean',
            confirmed: 'boolean',
            student_id: 'number',
            employee_id: 'number',
            repeatable: 'boolean',
            notes: 'string',
            office_id: 'number',
            performed: 'boolean',
            serviceType: ServiceType,
            status: Status,
            payment_id: 'number',
        };

        // Validate the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
        }



        try {
            const sesssionId = req.body.id;

            const upd_Session = {
                id:req.body.id,
                startDateTime: req.body.startDateTime,
                duration: req.body.duration,
                week_first_day: req.body.week_first_day,
                online: req.body.online,
                paid: req.body.paid,
                confirmed: req.body.confirmed,
                student_id: req.body.student_id,
                employee_id: req.body.employee_id,
                repeatable: req.body.repeatable,
                notes: req.body.notes,
                office_id: req.body.office_id,
                performed: req.body.performed,
                serviceType: ServiceType.log,
                status: Status.active,
                payment_id: req.body.payment_id,
            }

            const [rowsUpdated, [updatedStudentData]] = await SessionModel.update(upd_Session, { where: { id: sesssionId }, returning: true });

            if (rowsUpdated > 0) {
                res.json({ message: 'User_model updated successfully', updatedStudent: updatedStudentData });
            } else {
                res.status(404).json({ message: 'Student not found' });
            }
        } catch (err: any) {
            // console.log(err)
            res.status(500).json(err);
        }
    };
    public delete =  async (req:Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            await SessionModel.destroy({ where: { id: studentId } });
            res.json({ message: 'User_model deleted successfully' });
        } catch (err: any) {
            res.status(500).json(err)
        }
    };
}

export default SessionDriver
export {ISessionDriver}


interface ConstructorParams {
    factory?: ICreateUserFactory;
    dto?: ICreateUserDTO;
    model?: any;
}