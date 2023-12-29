import BaseDriver, {IBaseEntity} from "./baseDriver";
import {ICreateUserFactory} from "../factories/CreateUserFactory";
import {ICreateUserDTO} from "../DTO/UserDTO";
import {IUserModel} from "../../subject/user/user_model";

interface IUserDriver extends IBaseEntity{
    dto: ICreateUserDTO;
    model: any
}


export class UserDriver extends BaseDriver implements IUserDriver {
    public factory : ICreateUserFactory
    public dto: ICreateUserDTO
    public model: any
    // public answerFilter: any

    constructor({
                    factory,
                    dto,
                    model,
                    // answerFilter
    }: ConstructorParams ) {
        super();
        this.factory = factory
        this.dto = dto
        this.model = model
        // this.answerFilter = answerFilter
    }
}

export default UserDriver
export {IUserDriver}


interface ConstructorParams {
    factory: ICreateUserFactory;
    dto: ICreateUserDTO;
    model: any;
    // answerFilter: any;
}