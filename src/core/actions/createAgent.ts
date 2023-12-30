import {IStore} from "../store";
import {IUserDriver} from "../drivers/userDriver";
import {IOfficeDriver} from "../drivers/officeDriver";
import {IPaymentDriver} from "../drivers/paymentsDriver"
import express from "express";
import {ICore} from "../core";
import BaseAgent from "./baseAgent";
import {Request, Response} from "express";
import UserAttributes from "../../subject/user/user_interface";
import User_model from "../../subject/user/user_model";

// import EventEmitter from "events";
//

import {core} from "../../app";
// export const myEmitter = new EventEmitter();


// export const myEmitterInstance =  new myEmitter();
class CreateAgent extends BaseAgent implements ICreateAgent{

    req !: Request
    res !: Response
    initData !: any
    validData !: any
    buildData  !: any
    result !: any
    answer !: any

    constructor(core: ICore) {
        super(core)
        // const emitterInstance = myEmitterInstance
        // emitterInstance.on('eventA', this.user.bind(this));
    }

    public user = async (req: express.Request, res: express.Response): Promise<void> => {

        console.log('user')
        this.req = req
        this.res = res
        this.initData = req.body
        await this.createFlow(this.core.drivers.userDriver)

        // myEmitterInstance.processing =false
        // myEmitterInstance.processNext()
        return
    }
    public office = async (req: express.Request, res: express.Response): Promise<void> => {
        this.req = req
        this.res = res
        this.initData = req.body
        this.createFlow(this.core.drivers.officeDriver)
    }
    public payment = async (req: express.Request, res: express.Response): Promise<void> => this.createFlow(this.core.drivers.paymentDriver)



    public createFlow = async  (driver:DriverType):Promise<void> => {

        this.validData = driver.validate(this.initData)

        this.buildData = driver.buildDataPackToDB(this.validData)

        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });

        this.result = await driver.save({model: driver.model, data: this.buildData})

        this.answer = driver.answer(this.result, ['user_id', 'name', 'surname', 'age', 'status', 'createdAt' ])

        driver.sendOkAnswer(this.answer, this.res)

    }


}


interface ICreateAgent {
    user(req: any, res: any): Promise<void>;
    office(req: any, res: any): Promise<void>;
    payment(req: any, res: any): Promise<void>;
    createFlow(driver:any):Promise<void>
}



type DriverType = IUserDriver | IOfficeDriver | IPaymentDriver;
type ansver = Partial<UserAttributes>


export default CreateAgent
export {ICreateAgent, DriverType}