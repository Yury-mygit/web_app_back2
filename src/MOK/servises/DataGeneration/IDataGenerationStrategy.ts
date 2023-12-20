import {UserCreationAttributes} from "../../../interface/user_interface";

interface IDataGenerationStrategy {
    generateUserData(telegramId: number): UserCreationAttributes;
}

export default IDataGenerationStrategy