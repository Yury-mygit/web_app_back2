import Store, {IStore} from "./store";
import express, { Request, Response } from 'express';
import CreateAgent,{ICreateAgent,DriverType} from "./actions/createAgent";
import GetAgent, {IGetAgent} from "./actions/getAgent";
import UserDriver,{IUserDriver} from "./drivers/userDriver";
import UpdateAgent, {IUpdateAgent} from "./actions/updateAgent";
import OfficeDriver,{IOfficeDriver} from "./drivers/officeDriver";
import PaymentDriver,{IPaymentDriver} from "./drivers/paymentsDriver";
import CreateUserFactory from "./factories/CreateUserFactory";
import CreateUserDTO, {ICreateUserDTO} from "./DTO/UserDTO";
import User_model from "../subject/user/user_model";

interface IDriver {
    userDriver: IUserDriver;
    officeDriver: IOfficeDriver;
    paymentDriver: IPaymentDriver;
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
    agents: IAgents
    drivers: IDriver
    create:ICoreCreate;
}

// interface IDTO {
//     userDTO: ICreateUserDTO
// }


class Core implements ICore{
    private static instance: Core;



    public drivers: IDriver = {
        userDriver: new UserDriver({
            factory: new CreateUserFactory(),
            dto: new CreateUserDTO(),
            model: User_model
        }),
        officeDriver: new OfficeDriver(),
        paymentDriver: new PaymentDriver()
    }
    public agents :IAgents = {
        createAgent: new CreateAgent(this),
        getAgent: new GetAgent(this),
        updateAgent: new UpdateAgent(this)
    }


    // public dto : IDTO ={
    //     userDTO : new CreateUserDTO(),
    // }


    public create = {
        user: this.agents.createAgent.user,
        office: this.agents.createAgent.office,
        payment: this.agents.createAgent.payment
    }







    private store : IStore = new Store({"res": {}, 'rawData':{}, 'prepData':{}, 'resultData':{} })

    private constructor() {}

    public static getInstance(): Core {
        if (!Core.instance) {
            Core.instance = new Core();
        }
        return Core.instance;
    }

    public make = () => {
        // this.
    }




}

export default Core
export {ICore, IDriver, IAgents}













