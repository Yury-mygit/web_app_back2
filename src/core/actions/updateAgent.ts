import {IUserDriver} from "../drivers/userDriver";
import {IStore} from "../store";
import {ICore} from "../core";
import BaseAgent from "./baseAgent";

interface IUpdateAgent{

}

export class UpdateAgent extends BaseAgent implements IUpdateAgent{
    constructor(core: ICore) {
        super(core)
    }

    public update = () =>{

    }

}


export default UpdateAgent
export {IUpdateAgent}