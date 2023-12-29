/*
Core -

 */

import CreateAgent from "./actions/createAgent";
import GetAgent from "./actions/getAgent";
import UserDriver from "./drivers/userDriver";
import UpdateAgent from "./actions/updateAgent";
import OfficeDriver from "./drivers/officeDriver";
import PaymentDriver from "./drivers/paymentsDriver";
import CreateUserFactory from "./factories/CreateUserFactory";
import CreateUserDTO from "./DTO/UserDTO";
import User_model from "../subject/user/user_model";
import UserAnswerFilter from "./filter/UserAnswerFilter";

import {IDriver, IAgents, ICore } from './interfases'


class Core implements ICore{
    private static instance: Core;

    public drivers: IDriver = {
        userDriver: new UserDriver({
            factory: new CreateUserFactory(),
            dto: new CreateUserDTO(),
            model: User_model
            // answerFilter: new UserAnswerFilter()
        }),
        officeDriver: new OfficeDriver(),
        paymentDriver: new PaymentDriver()
    }
    public agents :IAgents = {
        createAgent: new CreateAgent(this),
        getAgent: new GetAgent(this),
        updateAgent: new UpdateAgent(this)
    }

    public create = {
        user: this.agents.createAgent.user,
        office: this.agents.createAgent.office,
        payment: this.agents.createAgent.payment
    }

    private constructor() {}

    public static getInstance(): Core {
        if (!Core.instance) {
            Core.instance = new Core();
        }
        return Core.instance;
    }

}

export default Core
export {ICore, IDriver, IAgents}













