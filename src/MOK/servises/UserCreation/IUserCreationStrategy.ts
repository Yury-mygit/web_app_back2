import {UserCreationAttributes} from "../../../interface/user_interface";
interface IUserCreationStrategy {
  createUser(data: UserCreationAttributes): Promise<any>;
}

export default IUserCreationStrategy