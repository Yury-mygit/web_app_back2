import UserAttributes, {UserCreationAttributes} from "../../../subject/user/user_interface";

interface IDataGenerationStrategy {
    generateUserData(telegramId: number): Partial< UserAttributes>;
}

export default IDataGenerationStrategy