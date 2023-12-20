import IUserCreationStrategy from "./UserCreation/IUserCreationStrategy";
import IDataGenerationStrategy from "./DataGeneration/IDataGenerationStrategy";
import { validate, ValidationError } from 'class-validator';

import UserResponse from "./validate";

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
            // console.log(data)
            const responseData = new UserResponse(data);
            // console.log(responseData)

            // Object.assign(responseData, await this.userCreationStrategy.createUser(responseData));

            const errors = await validate(responseData);
            if (errors.length > 0) {
                validationErrors.push(...errors); // Collect all validation errors
            }
        }

        if (validationErrors.length > 0) {
            console.error('Validation errors:', validationErrors);
            throw new Error(`Validation failed for one or more users.`);
        }

        return 'ok';
    }
}

export default FakeService