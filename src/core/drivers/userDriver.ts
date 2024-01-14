import BaseDriver, {IBaseEntity} from "./baseDriver";
import {ICreateUserFactory} from "../factories/CreateUserFactory";
import {ICreateUserDTO} from "../DTO/UserDTO";
import User_model, {IUserModel} from "../../subject/user/user_model";
import {Request, Response} from "express";
import {emiter} from "../core";

interface IUserDriver extends IBaseEntity{
    factory : ICreateUserFactory | undefined
    dto: ICreateUserDTO | undefined;
    model: any
    validate(data: any):any
    validation(req: Request): {
        status: string,
        data: {telegram_id: number | undefined, user_id: number | undefined}
    }
    create(req: Request, res: Response) : Promise<void>
    update(req: Request, res: Response) : Promise<void>;
    // takeManyAtr: string[]
    attributes : string[]
}

interface data {
    status: string,
    data: {
        errorDesc?:string,
        telegram_id: number | undefined,
        user_id: number | undefined
    }
}

export class UserDriver extends BaseDriver implements IUserDriver {
    public factory !: ICreateUserFactory | undefined
    public dto !: ICreateUserDTO | undefined
    public model !: any
    attributes : string[] = ["user_id", "name", "age"]

    constructor({
                    factory,
                    dto,
                    model,
                    // answerFilter
    }: ConstructorParams ) {
        super(dto );
        this.factory = factory
        this.dto = dto
        this.model = model

        // console.log( this.dto )
    }

    public validate = (data:any) => {
        // console.log(  data  )
        // console.log('this.dto')


        try{

            if(!this.dto) throw new Error('DTO not found!')

            // console.log(this.dto.validate(data))

            return this.dto.validate(data)

        }catch (e){
            console.log("Validation error",e)
            return {'status': "error", 'desc':e}
        }
    }


    public validation = (data: any): data => {

        const {user_id, telegram_id} = data
        //
        console.log(user_id, telegram_id)

        if (typeof user_id == "number" ) {
            if (typeof telegram_id == "number"){
                return {
                    status:"ok",
                    data: {
                        errorDesc: undefined,
                        user_id: user_id,
                        telegram_id: telegram_id
                    }
                }
            } else {
                return {
                    status:"ok",
                    data: {
                        errorDesc: undefined,
                        user_id: user_id,
                        telegram_id: undefined
                    }
                }
            }

        } else {
            if (typeof telegram_id !== "number"  ){
                return {
                    status:"ok",
                    data: {
                        errorDesc: undefined,
                        user_id: undefined,
                        telegram_id: telegram_id
                    }
                }
            }
        }



        return {
            status:"error",
            data: {
                errorDesc: " user_id or telegram_id should be a number ",
                user_id: undefined,
                telegram_id: undefined
            }
        }
    }

    public getOne = async (req: Request, res: Response): Promise<void> => {
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

    public create = async (req: Request, res: Response) : Promise<void> => {
        const validData = this.validate(req.body)


        // fill data set to full value
        const buildData = this.buildDataPackToDB(validData.data)
        // console.log(buildData)
        // save the data
        const result = await this.save({
            model: this.model,
            data: buildData,

        })

        // prepare answer
        const answer = this.answer(result, ['user_id', 'name', 'surname', 'age', 'status', 'createdAt' ])

        // send answer
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

            // Assuming that `this.model.update` returns the number of affected rows
            const [affectedRows] = await this.model.update(buildData, { where: { user_id: buildData.user_id } });

            if (affectedRows > 0) {
                // Retrieve the updated record
                const updatedRecord = await this.model.findOne({ where: { user_id: buildData.user_id } });
                if (updatedRecord) {
                    // Send back the fields of the updated record
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
}

export default UserDriver
export {IUserDriver}


interface ConstructorParams {
    factory?: ICreateUserFactory;
    dto?: ICreateUserDTO;
    model?: any;
}