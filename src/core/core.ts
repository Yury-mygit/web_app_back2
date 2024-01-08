/*
Core -

 */
import {Request, Response} from "express";
import CreateAgent from "./actions/createAgent";
import GetAgent from "./actions/getAgent";
import UserDriver, {IUserDriver} from "./drivers/userDriver";
import UpdateAgent from "./actions/updateAgent";
import ProductDriver from "./drivers/productDriver";
import OfficeDriver, {IOfficeDriver} from "./drivers/officeDriver";
import PaymentDriver, {IPaymentDriver} from "./drivers/paymentsDriver";
import CreateProductFactory from "./factories/CreateProductFactory";
import CreateUserFactory from "./factories/CreateUserFactory";
import CreateUserDTO from "./DTO/UserDTO";
import User_model from "../subject/user/user_model";
import {IDriver, IAgents, ICore } from './interfases'

import myEmitter from './EventRunner'
import {ISessionDriver} from "./drivers/sessionDriver";
import UpdateUserFactory from "../subject/user/UpdateUserFactory";
import {error} from "winston";

export const emiter = new myEmitter()

interface test{
    prop1 : number;
}
class a  implements test{
    prop1 = 100;
    constructor(data:any) {
        this.prop1 = data
    }
}

class Core implements ICore{
    private static instance: Core;
    private userDrive =   new UserDriver({
        factory: new CreateUserFactory(),
        dto: new CreateUserDTO(),
        model: User_model
    })

    private productDriver = new ProductDriver({
        factory: new CreateProductFactory(),
        dto: new CreateUserDTO(),
        model: User_model
    })

    // public drivers: IDriver = {
    //     userDriver: new UserDriver({
    //         factory: new CreateUserFactory(),
    //         dto: new CreateUserDTO(),
    //         model: User_model
    //     }),
    //     // officeDriver: new OfficeDriver({
    //     //     factory: new CreateUserFactory(),
    //     //     dto: new CreateUserDTO(),
    //     //     model: User_model
    //     // }),
    //     // paymentDriver: new PaymentDriver({
    //     //     factory: new CreateUserFactory(),
    //     //     dto: new CreateUserDTO(),
    //     //     model: User_model
    //     // })
    // }
    // public agents :IAgents = {
    //     createAgent: new CreateAgent(this),
    //     getAgent: new GetAgent(this),
    //     updateAgent: new UpdateAgent(this)
    // }

    // public create = {
    //     user: this.agents.createAgent.user,
    //     office: this.agents.createAgent.office,
    //     payment: this.agents.createAgent.payment
    // }

    private constructor() {
        emiter.on('getOneUser',  (req: Request, res: Response) =>
            this.getOneEntity(req, res, this.userDrive));
        emiter.on('letGetManyUsers',(req: Request, res: Response) =>
            this.getManyEntity(req, res, this.userDrive));
        emiter.on('createNewUserEvent', (req: Request, res: Response) =>
            this.createNewEntity(req, res, this.userDrive));
        emiter.on('updateCurrentUserEvent', (req: Request, res: Response) =>
            this.updateCurrentEntity(req, res, this.userDrive));
        emiter.on('deleteCurrentUserEvent', (req: Request, res: Response) =>
            this.deleteCurrentEntity( req, res, this.userDrive));

        emiter.on('takemanyproducts', (req: Request, res: Response)=>
            this.getManyEntity(req, res, this.productDriver));
    }

    public static getInstance(): Core {
        if (!Core.instance) {
            Core.instance = new Core();
        }
        return Core.instance;
    }




    public getOneEntity = async (req: Request, res: Response, driver: any)=> {

        const validData = driver.userIdValidate(req.body)
            // console.log(validData)
            if (validData.status == 'error')  driver.sendErrorAnswer(validData, res)

        // const answer = driver.getOne(req)


        // if (validData.status =='error') {
        //     res.json(validData)
        // }

        // const answer = driver.getOne(req )

        // let answer = 'ok'
        // driver.sendOkAnswer("validData", res)
    }

    public getManyEntity = async (req: Request, res: Response, driver: any) => {

        //Prepare data
        const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 2;
        const skip = typeof req.query.skip === 'string' ? parseInt(req.query.skip, 10) : 0;

        if (isNaN(limit) || isNaN(skip)) {
            driver.sendErrorAnswer('Invalid limit or skip parameter', res)
            return
        }

        // Gathering data from database
        const answer = await driver.getMany({ limit, skip});
        if (answer.status == 'error') {
            driver.sendErrorAnswer(answer, res)
            return
        }

        // Making an answer
        driver.sendOkAnswer(answer, res);

    }


    public createNewEntity = async (
        req: Request,
        res: Response,
        driver:
            IUserDriver
            | IOfficeDriver
            // | IPaymentDriver
            // | ISessionDriver
    ):Promise<void> => {

        // validate thi incoming data
        const validData = driver.validate(req.body)

        // fill data set to full value
        const buildData = driver.buildDataPackToDB(validData)

        // save the data
        const result = await driver.save({
            model: driver.model,
            data: buildData,

        })

        // prepare answer
        const answer = driver.answer(result, ['user_id', 'name', 'surname', 'age', 'status', 'createdAt' ])

        // send answer
        driver.sendOkAnswer(answer, res)

        // emiter.processing =false
        // emiter.processNext()
    }

    public updateCurrentEntity = async (
        req: Request,
        res: Response,
        driver: IUserDriver
            | IOfficeDriver
            // | IPaymentDriver
            // | ISessionDriver
    ) :Promise<void> => {

        const validData = driver.validate(req.body)
        const buildData = driver.buildDataPackToDB(validData)
        const result = await driver.update({
            model: driver.model,
            data: buildData,
            res: res
        })

        const answer = driver.answer(result, ['user_id', 'name', 'surname', 'age', 'status', 'createdAt' ])

        driver.sendOkAnswer(answer, res)

        // res.json('ok')
        emiter.processing =false
        emiter.processNext()
    }

    public deleteCurrentEntity = async (
        req: Request,
        res: Response,
        driver: IUserDriver | IOfficeDriver | IPaymentDriver | ISessionDriver
    )=> {

    }

}

export default Core
export {ICore, IDriver, IAgents}




// await new Promise((resolve) => {
//     setTimeout(resolve, 4000);
// });








