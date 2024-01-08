import {IUserDriver} from "./drivers/userDriver";
import {IOfficeDriver} from "./drivers/officeDriver";
import {IPaymentDriver} from "./drivers/paymentsDriver";
import {ICreateAgent} from "./actions/createAgent";
import {IGetAgent} from "./actions/getAgent";
import {IUpdateAgent} from "./actions/updateAgent";
import {Request, Response} from "express";


interface IDriver {
    userDriver: IUserDriver;
    // officeDriver: IOfficeDriver;
    // paymentDriver: IPaymentDriver;
}

interface IAgents {
    createAgent: ICreateAgent;
    getAgent: IGetAgent;
    updateAgent: IUpdateAgent;
}

interface ICoreCreate {
    user(req: Request, res: Response): Promise<void>;
    office(req: Request, res: Response): Promise<void>;
    payment(req: Request, res: Response): Promise<void>;
}
interface ICore{
    // agents: IAgents
    // drivers: IDriver
    // create:ICoreCreate;
}


export {
    IDriver,
    IAgents,
    ICoreCreate,
    ICore
}