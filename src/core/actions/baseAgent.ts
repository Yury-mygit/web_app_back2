import {ICore} from "../core";

interface IBaseAgent {
    core: ICore

}

class BaseAgent implements IBaseAgent {
    public core :ICore

    constructor(core: ICore) {
        this.core = core
    }



}

export default BaseAgent
export {IBaseAgent}