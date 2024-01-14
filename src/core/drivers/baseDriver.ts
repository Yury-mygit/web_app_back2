import IStore from '../store'
import answerFilter from "../filter/UserAnswerFilter";
import {Response, Request} from "express";
import Core from "../core";
import {da} from "@faker-js/faker";
import User_model from "../../subject/user/user_model";

export interface IBaseEntity {
    configureStore(store_: IStore) :void
    // validate(): void
    sayHello():void
    // configureStore
    save({ model, data }: { model: any, data: any }): Promise<any>;
    update(req: Request, res: Response): Promise<void>;
    answer(data: any, filter: string[]): any
    sendOkAnswer (data: any, res: Response):any
    sendErrorAnswer(data: any, res: Response):any
    getOne (req: Request, res: Response):Promise<void>
    getMany(req: Request, res: Response):Promise<void>
    // validate(data: any):any
    buildDataPackToDB(data: any):any
    answerBuild(data: any) :any;
    create(req: Request, res: Response) : Promise<void>
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
        // console.log( this.dto)
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


    public getOne = async (req: Request, res: Response):Promise<void> => {

    }

    public getMany= async (req: Request, res: Response):Promise<void> => {

        let { limit, skip } = req.body;

        try {

            const primaryKey = this.model.primaryKeyAttribute;

            const ansver = await this.model.findAll({
                offset: skip,
                limit: limit,
                order: [primaryKey], // Corrected order syntax
                attributes:this.attributes
            });
            // console.log(ansver)
            this.sendOkAnswer({
                status: 'ok',
                data: ansver
            }, res)
        } catch (error: any) {
            this.sendErrorAnswer( {
                status: 'error',
                data: error
            }, res)
        }
    }



    public save = async ({model, data} : {model: any, data:any}) => {

        // console.log(data)
        try {
            const answer:any = await model.create(data);
            return answer.dataValues

        } catch (error: any) {
            throw new Error('Error')
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

    public create = async (req: Request, res: Response) : Promise<void> => {}

}

export default BaseDriver