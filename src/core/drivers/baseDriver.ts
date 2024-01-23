import IStore from '../store'
import answerFilter from "../filter/UserAnswerFilter";
import {Response, Request} from "express";
import Core from "../core";
import {da} from "@faker-js/faker";
import User_model from "../models/user_model";

export interface IBaseEntity {
    configureStore(store_: IStore) :void
    sayHello():void
    save({ model, data }: { model: any, data: any }): Promise<any>;
    update(req: Request, res: Response): Promise<void>;
    answer(data: any, filter: string[]): any
    sendOkAnswer (data: any, res: Response):any
    sendErrorAnswer(data: any, res: Response):any
    baseGetOne (req: Request, res: Response):Promise<void>
    // baseTakeMany(req: Request, res: Response):Promise<void>
    buildDataPackToDB(data: any):any
    answerBuild(data: any) :any;
    BaseCreate(req: Request, res: Response) : Promise<void>
    baseDelete(req:Request, res: Response): Promise<void>
    dto:any
    factory:any
    model:any
    answerFilter: any
}

abstract class BaseDriver implements IBaseEntity{
     store!: IStore;
     dto!:any
     factory:any = undefined
     model:any = undefined
     answerFilter:any = undefined

    protected attributes?: string[]; // Define attributes as a protected member

    public constructor(dto: any = undefined) {
         this.dto = dto
    }

    public configureStore(store_: IStore): void {
        this.store = store_;
    }

    // public abstract validate(): void;
    public sayHello = () => {
        console.log("Hello from user")
    }


    buildDataPackToDB = (data: any):any => {
        if (!this.factory) {
            console.error("Factory is not defined.");
            return;
        }

        try{
            return this.factory.create(data)

        }catch (e){
            console.log("the error is",e)
        }
    }


    buildDataUpdatePackToDB = (data: any): any => {
        if (!this.factory) {
            console.error("Factory is not defined.");
            return;
        }

        try {
            return this.factory.update(data);
        } catch (e) {
            console.error("the error is", e);
        }
    };


    public baseGetOne = async (req: Request, res: Response):Promise<void> => {
        res.status(200).json('Placeholder Base Take One ')
    }

    public baseTakeMany= async (req: Request, res: Response):Promise<void> => {

        let { limit, skip } = req.body;

        try {

            const primaryKey = this.model.primaryKeyAttribute;

            const answer = await this.model.findAll({
                offset: skip,
                limit: limit,
                order: [primaryKey], // Corrected order syntax
                attributes:this.attributes
            });
            // console.log(answer)
            this.sendOkAnswer({
                status: 'ok',
                data: answer
            }, res)
        } catch (error: any) {
            this.sendErrorAnswer( {
                status: 'error',
                data: error
            }, res)
        }
    }



    public save = async ({model, data} : {model: any, data:any}) => {
        try {
            const answer:any = await model.create(data);
            return answer.dataValues

        } catch (error: any) {
            throw new Error('Error :' + error)
        }
    }

    public update = async (req: Request, res: Response) => {

        // try {
        //      if (!data.user_id && !data.telegram_id) {
        //          return {"status" : "error" , 'desk': "The user cannot be identified. Set user_id or telegram_id"}
        //      }
        //
        //      const answer:any = await model.update(data, { where: { user_id: data.user_id } });
        //      return answer.dataValues
        //
        // } catch (error: any) {
        //     throw new Error(error)
        // }
    }

    public baseDelete = async (req: Request, res: Response) => {
        const id = req.params.id; // or req.body.id if the ID is sent in the body

        try {
            // Obtain the primary key column name dynamically from the model
            const primaryKeyColumnName = this.model.primaryKeyAttribute;

            const result = await this.model.destroy({
                where: { [primaryKeyColumnName]: id }
            });

            if (result > 0) {
                res.status(200).json({ message: 'Entry deleted successfully' });
            } else {
                res.status(404).json({ message: 'Entry not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting entry' });
        }
    }

    public answerBuild =  (data:any) =>{
         return this.answerFilter.build(data)
    }

    public answer = (data: any, filter: string[]) => {

         if (data.status == 'error') return data

         const filteredData: any = {};
         filter.forEach((field) => {
             if (data.hasOwnProperty(field)) {
                 filteredData[field] = data[field];
             }
         });
         return filteredData;
    }

    public sendOkAnswer = (data: any, res: Response) =>{

        res.status(201).json(data)
    }



    public sendErrorAnswer = (data: any, res: Response) =>{
         // console.log(data)
        res.status(400).json(data)
    }

    public BaseCreate = async (req: Request, res: Response) : Promise<void> => {}

}

export default BaseDriver