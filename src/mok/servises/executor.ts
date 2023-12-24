import IUserCreationStrategy from "./UserCreation/IUserCreationStrategy";
import IDataGenerationStrategy from "./DataGeneration/IDataGenerationStrategy";
import { validate, ValidationError } from 'class-validator';
import {NextFunction, Request, Response} from "express";
import UserValidate from "./validate";
import UserAttributes from "../../subject/user/user_interface";
// import Log from "../../servises/debug";
import {IExecutor, IWorkspace} from "../fake_controller";

class Executor implements IExecutor{
    private userCreation: IUserCreationStrategy;
    private dataGenerationStrategy: IDataGenerationStrategy;
    private workspace !:IWorkspace

    constructor(
        userCreationStrategy: IUserCreationStrategy,
        dataGenerationStrategy: IDataGenerationStrategy
    ) {
        this.userCreation = userCreationStrategy;
        this.dataGenerationStrategy = dataGenerationStrategy;
    }

    public connectWorkspace = (ws:any)=>{
        this.workspace = ws
        // Log('workspace is bound to executor ')
    }

    async makeUser( resultTarget:string, response:string, ids:string): Promise<void> {

        const telegramIds = this.workspace.getData(ids)
        const res:Response = this.workspace.getData(response)

        const validationErrors: ValidationError[] = [];

        for (let i = 0; i < telegramIds.length; i++) {
            const data = this.dataGenerationStrategy.generateUserData(telegramIds[i]);

            const validData : Partial<UserAttributes> = new UserValidate(data as Partial<UserAttributes>);

            try {
                Object.assign(validData, await this.userCreation.createUser(validData as Partial<UserAttributes>));
            }catch (e){
                res.status(500).json({ "message": e });
            }
        }
        this.workspace.setData(resultTarget, {"status": "ok", data: {}})
    }
    async makeres(resultTarget: string, response: string,) : Promise<void> {

        const result = this.workspace.getData(resultTarget)
        const res:Response = this.workspace.getData(response)
        res.json({"message":`Created  users`, data: result})
    }

}

export default Executor