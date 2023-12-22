import UserAttributes from "../../../subject/user/user_interface";
interface IUserCreationStrategy {
  createUser(data: Partial<UserAttributes>): Promise<any>;
}

export default IUserCreationStrategy