import BaseDriver, {IBaseEntity} from "./baseDriver";
import {ICreateProductFactory} from "../factories/CreateProductFactory";
import {ICreateUserDTO} from "../DTO/UserDTO";
import {IUserModel} from "../../subject/user/user_model";

interface IProductDriver extends IBaseEntity{
    factory : ICreateProductFactory | undefined
    dto: ICreateUserDTO | undefined;
    model: any
}


export class ProductDriver extends BaseDriver implements IProductDriver {
    public factory !: ICreateProductFactory | undefined
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

export default ProductDriver
export {IProductDriver}


interface ConstructorParams {
    factory?: ICreateProductFactory;
    dto?: ICreateUserDTO;
    model?: any;
}