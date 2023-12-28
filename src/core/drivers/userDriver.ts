import BaseDriver, {IBaseEntity} from "./baseDriver";
import {IStore} from "../store";
import {ICreateUserFactory} from "../factories/CreateUserFactory";
import {ICreateUserDTO} from "../DTO/UserDTO";
import {IUserModel} from "../../subject/user/user_model";

interface IUserDriver extends IBaseEntity{
    // sayHello():void
    // configureStore(store_: IStore):void
    dto: ICreateUserDTO;
    model: any
}


export class UserDriver extends BaseDriver implements IUserDriver {
    public factory : ICreateUserFactory
    public dto: ICreateUserDTO
    public model: any

    constructor({factory, dto, model}: ConstructorParams ) {
        super();
        this.factory = factory
        this.dto = dto
        this.model = model
    }


    validate(): void {
        // const data_: Partial<UserAttributes> = this.store.getData(data);
        // const createUserDTO: Partial<UserAttributes> = new CreateUserDTO(data_);
        // const userData: Partial<UserAttributes> = this.factory.create(createUserDTO);
        //
        // this.store.setData(target, userData);
    }

    // sayHello = () => {
    //     console.log("Hello from user")
    // }

}

export default UserDriver
export {IUserDriver}


interface ConstructorParams {
    factory: ICreateUserFactory;
    dto: ICreateUserDTO;
    model: any
}