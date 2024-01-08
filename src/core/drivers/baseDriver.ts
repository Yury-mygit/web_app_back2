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
    update({ model, data, res }: { model: any, data: any, res: Response }): Promise<any>;
    answer(data: any, filter: string[]): any
    sendOkAnswer (data: any, res: Response):any
    sendErrorAnswer(data: any, res: Response):any
    getOne (req: Request):Promise<any>
    getMany({limit, skip} : {limit: number, skip: number}):Promise<any>
    // validate(data: any):any
    buildDataPackToDB(data: any):any
    answerBuild(data: any) :any;
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
        try{
            return this.factory.create(data)

        }catch (e){
            console.log(e)
        }
    }


    public getOne = async (req: Request):Promise<any> => {

        // const {user_id, telegram_id, ...other }:{user_id :number, telegram_id:number}= req.body
        //  console.log(req)

        const {user_id, telegram_id, ...rest }:{user_id :number, telegram_id:number, rest: any }= req.body

        const options = {
            where:{}
        }

        if ( user_id) {
            options.where = {
                user_id:  user_id
            };
        } else {
            options.where = {
                telegram_id:  telegram_id
            };
        }

        try {
            const user = await User_model.findOne(options);
            if (!user) throw new Error('There is no user with user id =' +  user_id)
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public getMany= async ({limit, skip} : {limit: number, skip: number}):Promise<any> => {



        try {

            const primaryKey = this.model.primaryKeyAttribute;

            const ansver = await this.model.findAll({
                offset: skip,
                limit: limit,
                order: [primaryKey], // Corrected order syntax
                attributes:this.attributes
            });
            // console.log(ansver)
            return {
                status: 'ok',
                data: ansver
            };
        } catch (error: any) {
            return {
                status: 'error',
                data: error
            }
        }
    }



    public save = async ({model, data} : {model: any, data:any}) => {
        try {
            const answer:any = await this.model.create(data);
            return answer.dataValues

        } catch (error: any) {
            throw new Error('Error')
        }
    }

    public update = async ({model, data, res} : {model: any, data:any, res: Response}) => {

        try {
             if (!data.user_id && !data.telegram_id) {
                 return {"status" : "error" , 'desk': "The user cannot be identified. Set user_id or telegram_id"}
             }

             const answer:any = await model.update(data, { where: { user_id: data.user_id } });
             return answer.dataValues

        } catch (error: any) {
            throw new Error(error)
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
         console.log(data)
        res.status(400).json(data)
    }

}

export default BaseDriver