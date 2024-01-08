import BaseDriver, {IBaseEntity} from "./baseDriver";
import {ICreateUserFactory} from "../factories/CreateUserFactory";
import {ICreateUserDTO} from "../DTO/UserDTO";
import {IUserModel} from "../../subject/user/user_model";

interface IUserDriver extends IBaseEntity{
    factory : ICreateUserFactory | undefined
    dto: ICreateUserDTO | undefined;
    model: any
    validate(data: any):any
    userIdValidate(req: Request): {
        status: string,
        data: {telegram_id: number | undefined, user_id: number | undefined}
    }
    // takeManyAtr: string[]
    attributes : string[]
}


export class UserDriver extends BaseDriver implements IUserDriver {
    public factory !: ICreateUserFactory | undefined
    public dto !: ICreateUserDTO | undefined
    public model !: any
    attributes : string[] = ["user_id", "name", "age"]

    constructor({
                    factory,
                    dto,
                    model,
                    // answerFilter
    }: ConstructorParams ) {
        super(dto );
        this.factory = factory
        this.dto = dto
        this.model = model

        // console.log( this.dto )
    }

    public validate = (data:any) => {
        // console.log(  this.dto  )
        // console.log('this.dto')


        try{

            if(!this.dto) throw new Error('DTO not found!')
            return this.dto.validate(data)

        }catch (e){
            console.log("Validation error",e)
            return {'status': "error", 'desc':e}
        }
    }

    public userIdValidate = (req: Request): {
        status: string,
        data: {telegram_id: number | undefined, user_id: number | undefined}
    } => {
        //
        // if (req.body && typeof (req.body.user_id) == 'number'){
        //
        // }

        return {
            status:"error",
            data: {
                user_id: undefined,
                telegram_id: undefined
            }
        }
    }



}

export default UserDriver
export {IUserDriver}


interface ConstructorParams {
    factory?: ICreateUserFactory;
    dto?: ICreateUserDTO;
    model?: any;
}