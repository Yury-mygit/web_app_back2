import BaseDriver, {IBaseEntity} from "./baseDriver";
import {ICreateUserFactory} from "../factories/UserFactory";
import {ICreateUserDTO} from "../DTO/UserDTO";
import User_model from "../models/user_model";
import {Request, Response} from "express";

interface IUserDriver extends IBaseEntity{
    factory : ICreateUserFactory | undefined
    dto: ICreateUserDTO | undefined;
    model: any
    validate(data: any):any;
    takeByTelegramId (req: Request, res: Response):Promise<void>;
    takeOne (req: Request, res: Response):Promise<void>;
    takeMany(req: Request, res: Response):Promise<void>;
    create(req: Request, res: Response) : Promise<void>;
    update(req: Request, res: Response) : Promise<void>;
    delete(req:Request, res: Response): Promise<void>;
    attributes : string[]
}

interface ConstructorParams {
    factory?: ICreateUserFactory;
    dto?: ICreateUserDTO;
    model?: any;
}


class UserDriver extends BaseDriver implements IUserDriver {
    public factory !: ICreateUserFactory | undefined
    public dto !: ICreateUserDTO | undefined
    public model !: any
    attributes : string[] = ["user_id", "name", "age"]

    constructor({factory, dto, model,}: ConstructorParams ) {
        super(dto );
        this.factory = factory
        this.dto = dto
        this.model = model
    }

    public validate = (data:any):any => {
        try{
            if(!this.dto) throw new Error('DTO not found!')
            return this.dto.validate(data)
        }catch (e){
            console.log("Validation error",e)
            return {'status': "error", 'desc':e}
        }
    }

    public takeMany = async (req: Request, res: Response): Promise<void> => {
        // Call the takeMany method from BaseDriver
        await this.baseTakeMany(req, res)
        // await super.baseTakeMany(req, res)

    };


    public takeOne_old = async (req: Request, res: Response): Promise<void> => {
        let { user_id, telegram_id } = req.body;

        user_id = Number(user_id);
        telegram_id = Number(telegram_id);

        const options = {
            where: user_id ? { user_id } : telegram_id ? { telegram_id } : undefined
        };

        if (!options.where) {
            this.sendErrorAnswer('user_id or telegram_id should be a number', res);
            return;
        }

        try {
            const user = await User_model.findOne(options);
            if (!user) {
                this.sendErrorAnswer({
                    status: "error",
                    data: {
                        errorDesc: 'There is no user with the provided identifier'
                    }
                }, res);
                return;
            }

            this.sendOkAnswer({
                status: "ok",
                data: user
            }, res);

        } catch (error) {
            console.error(error);
            res.status(500).send('An unexpected error occurred');
        }
    };


    public takeByTelegramId = async (req: Request, res: Response): Promise<void> =>{
        const telegram_id :number = Number(req.body.telegram_id)

        if ( telegram_id == 0 ) {
            this.sendErrorAnswer(typeof (`telegram_id are incorrect = ${telegram_id}`), res)
            return
        }
        const options = {
            where:  { "telegram_id" :  telegram_id}
        };
        try {
            const user = await User_model.findOne(options);
            if (!user) {
                this.sendErrorAnswer({
                    status: "error",
                    data: {
                        errorDesc: 'There is no user with the provided identifier'
                    }
                }, res);
                return;
            }

            this.sendOkAnswer({
                status: "ok",
                data: user
            }, res);

        } catch (error) {
            console.error(error);
            res.status(500).send('An unexpected error occurred');
        }
    }

    public takeOne = async (req: Request, res: Response): Promise<void> => {
        const  user_id  =  Number(req.body.user_id)

        if ( user_id == 0 ) {
            this.sendErrorAnswer(typeof (`user_id are incorrect = ${user_id}`), res)
            return
        }

        const options = {
            where:  { "user_id" :  user_id}
        };

        try {
            const user = await User_model.findOne(options);
            if (!user) {
                this.sendErrorAnswer({
                    status: "error",
                    data: {
                        errorDesc: 'There is no user with the provided identifier'
                    }
                }, res);
                return;
            }

            this.sendOkAnswer({
                status: "ok",
                data: user
            }, res);

        } catch (error) {
            console.error(error);
            res.status(500).send('An unexpected error occurred');
        }
    }


    public create = async (req: Request, res: Response) : Promise<void> => {


        const validData = this.validate(req.body)
        const buildData = this.buildDataPackToDB(validData.data)
        const result = await this.save({
            model: this.model,
            data: buildData,
        })

        const answer = this.answer(result, ['user_id', 'name', 'surname', 'age', 'status', 'createdAt' ])

        this.sendOkAnswer(answer, res)
    }

    public update = async (req: Request, res: Response): Promise<void> => {



        const validData = this.validate(req.body);



        const buildData = this.buildDataUpdatePackToDB(validData.data);



        try {
            if (!buildData.user_id && !buildData.telegram_id) {
                this.sendErrorAnswer('error: user_id or telegram_id is needed', res);
                return;
            }

            let options = {}

            if (!buildData.user_id){
                options = { where: { telegram_id: buildData.telegram_id } }
            } else options = { where: { user_id: buildData.user_id } }

            const [affectedRows] = await this.model.update(buildData, options);

            if (affectedRows > 0) {
                const updatedRecord = await this.model.findOne({ where: { user_id: buildData.user_id } });
                if (updatedRecord) {
                    this.sendOkAnswer({
                        user_id: updatedRecord.user_id,
                        name: updatedRecord.name,
                        surname: updatedRecord.surname,
                        parents: updatedRecord.parents,
                        age: updatedRecord.age,
                        status: updatedRecord.status,
                        attendance: updatedRecord.attendance,
                        absences: updatedRecord.absences,
                        email: updatedRecord.email,
                        telephone: updatedRecord.telephone,
                        telegram_notification: updatedRecord.telegram_notification,
                        telegram_id: updatedRecord.telegram_id,
                        issue: updatedRecord.issue,
                        initial_diagnosis_date: updatedRecord.initial_diagnosis_date,
                        address: updatedRecord.address,
                        found_through: updatedRecord.found_through,
                        online: updatedRecord.online,
                        notes: updatedRecord.notes
                    }, res);
                } else {
                    this.sendErrorAnswer('error: The record was updated but could not be retrieved.', res);
                }
            } else {
                this.sendErrorAnswer('error: No record was updated.', res);
            }
        } catch (error: any) {
            this.sendErrorAnswer(error, res);
        }
    };

    public delete = async (req: Request, res: Response): Promise<void> =>{
        this.baseDelete(req, res)
    }


}



export default UserDriver
export {IUserDriver}


