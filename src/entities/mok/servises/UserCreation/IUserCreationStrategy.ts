import UserAttributes from "../../../../interface/user_interface";
interface IUserCreationStrategy {
  createUser(data: UserAttributes): Promise<any>;
}

export default IUserCreationStrategy