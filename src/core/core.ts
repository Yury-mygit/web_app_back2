/*
Core -

 */
import {Request, Response} from "express";
import UserDriver, {IUserDriver} from "./drivers/userDriver";
import ProductDriver from "./drivers/productDriver";
import OfficeDriver, {IOfficeDriver} from "./drivers/officeDriver";
import PaymentDriver, {IPaymentDriver} from "./drivers/paymentsDriver";
import CreateProductFactory from "./factories/CreateProductFactory";
import UserFactory from "./factories/UserFactory";
import CreateUserDTO from "./DTO/UserDTO";
import User_model from "./models/user_model";
import ProductModel from "./models/product_model";
import {IDriver, IAgents, ICore } from './interfases'
import myEmitter from './EventRunner'
import {ISessionDriver} from "./drivers/sessionDriver";


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
        factory: new UserFactory(),
        dto: new CreateUserDTO(),
        model: User_model
    })

    private productDriver = new ProductDriver({
        factory: new CreateProductFactory(),
        dto: new CreateUserDTO(),
        model: ProductModel
    })

    // public drivers: IDriver = {
    //     userDriver: new UserDriver({
    //         factory: new UserFactory(),
    //         dto: new CreateUserDTO(),
    //         model: User_model
    //     }),
    //     // officeDriver: new OfficeDriver({
    //     //     factory: new UserFactory(),
    //     //     dto: new CreateUserDTO(),
    //     //     model: User_model
    //     // }),
    //     // paymentDriver: new PaymentDriver({
    //     //     factory: new UserFactory(),
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
        emiter.on('TakeOneUserByIdEvent',  (req: Request, res: Response) =>
            this.getOneEntity(req, res, this.userDrive));
        emiter.on('TakeOneUserByTelegramIdEvent',  (req: Request, res: Response) =>
            this.getOneByTelegramId(req, res, this.userDrive));
        emiter.on('TakeManyUsersEvent',(req: Request, res: Response) =>
            this.takeManyEntity(req, res, this.userDrive));
        emiter.on('CreateOneUserEvent', (req: Request, res: Response) =>
            this.createNewEntity(req, res, this.userDrive));
        emiter.on('UpdateOneUserEvent', (req: Request, res: Response) =>
            this.updateCurrentEntity(req, res, this.userDrive));
        emiter.on('DeleteOneUserEvent', (req: Request, res: Response) =>
            this.deleteCurrentEntity( req, res, this.userDrive));


        emiter.on('letTakeOneProductEvent', (req: Request, res: Response)=>
            this.getOneEntity(req, res, this.productDriver));
        emiter.on('letTakeManyProductEvent', (req: Request, res: Response)=>
            this.takeManyEntity(req, res, this.productDriver));
        emiter.on('letCreateProductEvent', (req: Request, res: Response)=>
            this.createNewEntity(req, res, this.productDriver));
        emiter.on('letUpdateProductEvent', (req: Request, res: Response)=>
            this.updateCurrentEntity(req, res, this.productDriver));
        emiter.on('letDeleteProductEvent', (req: Request, res: Response)=>
            this.deleteCurrentEntity(req, res, this.productDriver));
    }

    public static getInstance(): Core {
        if (!Core.instance) {
            Core.instance = new Core();
        }
        return Core.instance;
    }


    public getOneByTelegramId = async (
        req: Request,
        res: Response,
        driver: IUserDriver
    ): Promise<void>=> {

        await driver.takeByTelegramId(req, res)

    }

    public getOneEntity = async (
        req: Request,
        res: Response,
        driver: IUserDriver | IOfficeDriver | IPaymentDriver | ISessionDriver
    ): Promise<void>=> {

        await driver.takeOne(req, res)

    }

    public takeManyEntity = async (
        req: Request,
        res: Response,
        driver: IUserDriver | IOfficeDriver | IPaymentDriver | ISessionDriver
    ): Promise<void> => {
        await driver.takeMany(req, res)
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
    ):Promise<void> => {
        await driver.update(req, res)
    }

    public deleteCurrentEntity = async (
        req: Request,
        res: Response,
        driver: IUserDriver | IOfficeDriver | IPaymentDriver | ISessionDriver
    ):Promise<void> => {
        await driver.delete(req, res)
    }

    public consumePayment = async () => {

    }

}

export default Core
export {ICore, IDriver, IAgents}




// await new Promise((resolve) => {
//     setTimeout(resolve, 4000);
// });








