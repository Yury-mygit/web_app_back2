import IUserCreationStrategy from "./UserCreation/IUserCreationStrategy";
import IDataGenerationStrategy from "./DataGeneration/IDataGenerationStrategy";
import { validate, ValidationError } from 'class-validator';

import UserResponse from "./validate";
import UserAttributes from "../../subject/user/user_interface";

class FakeService {
    private userCreationStrategy: IUserCreationStrategy;
    private dataGenerationStrategy: IDataGenerationStrategy;

    constructor(
        userCreationStrategy: IUserCreationStrategy,
        dataGenerationStrategy: IDataGenerationStrategy
    ) {
        this.userCreationStrategy = userCreationStrategy;
        this.dataGenerationStrategy = dataGenerationStrategy;
    }

    async makeUser(userCount: number, telegramIds: number[]): Promise<string> {
        const validationErrors: ValidationError[] = [];

        for (let i = 0; i < userCount; i++) {
            const data = this.dataGenerationStrategy.generateUserData(telegramIds[i]);
            // console.log("data = " , data)
            const responseData : Partial<UserAttributes> = new UserResponse(data as Partial<UserAttributes>);


            // console.log("responseData=",responseData)
            Object.assign(responseData, await this.userCreationStrategy.createUser(responseData as Partial<UserAttributes>));

        }
        return 'ok';
    }
}

export default FakeService