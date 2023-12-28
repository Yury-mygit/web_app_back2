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


class CreateAgent extends BaseAgent implements ICreateAgent{

    req !: Request
    res !: Response
    initData !: any
    validData !: any
    buildData  !: any
    answer !: any

    constructor(core: ICore) {
        super(core)
    }

    public user = async (req: express.Request, res: express.Response): Promise<void> => {
        this.req = req
        this.res = res
        this.initData = req.body
        this.createFlow(this.core.drivers.userDriver)
    }
    public office = async (req: express.Request, res: express.Response): Promise<void> => {
        this.req = req
        this.res = res
        this.initData = req.body
        this.createFlow(this.core.drivers.officeDriver)
    }
    public payment = async (req: express.Request, res: express.Response): Promise<void> => this.createFlow(this.core.drivers.paymentDriver)

    public createFlow = async  (driver:DriverType):Promise<void> => {

        this.validData = driver.dto.validate(this.initData)

        this.buildData = driver.factory.create(this.validData)

        try {
            const answer:ansver = await driver.model.create(this.buildData);
            this.res.json(answer)

        } catch (error: any) {
            this.res.json(error)
        }




        // this.store.setMultipleData({"res":res, 'rawData':req.body, 'prepData':{}, 'resultData':{} })

        // 2 Validate data from
        if ('getFactory' in driver && typeof driver.getFactory === 'function') {
            // const factory = (driver as IUserDriver).getFactory();
            // console.log(factory);
        }
        driver.validate()
        //
        // // 3. Save to database
        // await this.driver.createUser('prepData', 'resultData')
        //
        // // 4. maker response
        // await this.driver.success("res",'resultData')
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