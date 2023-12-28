import {IUserDriver} from "../drivers/userDriver";
import {IStore} from "../store";
import {ICore} from "../core";
import BaseAgent from "./baseAgent";

interface IGetAgent{

}

class GetAgent extends BaseAgent implements IGetAgent{

    constructor(core: ICore) {
        super(core)
    }

    public get = () =>{

    }

}

export default GetAgent
export {IGetAgent}