import BaseDriver, {IBaseEntity} from "./baseDriver";
import {ICreateUserFactory} from "../factories/CreateUserFactory";
import {ICreateUserDTO} from "../DTO/UserDTO";
import {IUserModel} from "../../subject/user/user_model";

interface ISessionDriver extends IBaseEntity{
    factory : ICreateUserFactory | undefined
    dto: ICreateUserDTO | undefined;
    model: any
}


export class SessionDriver extends BaseDriver implements ISessionDriver {
    public factory !: ICreateUserFactory | undefined
    public dto !: ICreateUserDTO | undefined
    public model !: any

    constructor({
                    factory,
                    dto,
                    model,
                    // answerFilter
                }: ConstructorParams ) {
        super();
        this.factory = factory ||undefined
        this.dto = dto || undefined
        this.model = model || undefined
    }
}

export default SessionDriver
export {ISessionDriver}


interface ConstructorParams {
    factory?: ICreateUserFactory;
    dto?: ICreateUserDTO;
    model?: any;
}