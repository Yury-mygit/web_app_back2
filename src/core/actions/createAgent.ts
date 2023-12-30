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

interface ImyEmitter   {
    eventQueue: any
}

import EventEmitter from "events";

interface ImyEmitter {
    emit(event: string | symbol, ...args: any[]): boolean;
    processNext(): void;
}
export class myEmitter extends EventEmitter implements ImyEmitter {
    eventQueue: Array<{ event: string | symbol; args: any[] }>;
    processing: boolean;

    constructor() {
        super();
        this.eventQueue = [];
        this.processing = false;
    }

    emit(event: string | symbol, ...args: any[]): boolean {

        this.eventQueue.push({ event, args });
        this.processNext();
        return true;
    }

    async processNext(): Promise<void> {
        // console.log(this.processing || this.eventQueue.length === 0)
        if (this.processing || this.eventQueue.length === 0) {
            return;
        }
        this.processing = true;
        const { event, args } = this.eventQueue.shift()!;
        super.emit(event, ...args);

    }
}

export const myEmitterInstance =  new myEmitter();
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
        const emitterInstance = myEmitterInstance
        emitterInstance.on('eventA', this.user.bind(this));
    }

    public user = async (req: express.Request, res: express.Response): Promise<void> => {

        console.log('user')
        this.req = req
        this.res = res
        this.initData = req.body
        await this.createFlow(this.core.drivers.userDriver)

        myEmitterInstance.processing =false
        myEmitterInstance.processNext()
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