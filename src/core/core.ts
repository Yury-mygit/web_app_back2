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

        await driver.getOne(req, res)

    }

    public getManyEntity = async (
        req: Request,
        res: Response,
        driver: IUserDriver | IOfficeDriver | IPaymentDriver | ISessionDriver
    ): Promise<void> => {
        await driver.getMany(req, res)
    }

    public createNewEntity = async (
        req: Request,
        res: Response,
        driver: IUserDriver | IOfficeDriver | IPaymentDriver | ISessionDriver
    ):Promise<void> => {
        await driver.create(req, res)
    }

    public updateCurrentEntity = async (
        req: Request,
        res: Response,
        driver: IUserDriver | IOfficeDriver | IPaymentDriver | ISessionDriver
    ) :Promise<void> => {
        await driver.update(req, res)
    }

    public deleteCurrentEntity = async (
        req: Request,
        res: Response,
        driver: IUserDriver | IOfficeDriver | IPaymentDriver | ISessionDriver
    )=> {

    }

    public consumePayment = async () => {

    }

}

export default Core
export {ICore, IDriver, IAgents}




// await new Promise((resolve) => {
//     setTimeout(resolve, 4000);
// });








