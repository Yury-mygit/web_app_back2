import axios from "axios";
import IUserCreationStrategy from "./IUserCreationStrategy";
import UserAttributes from "../../../subject/user/user_interface";
class AxiosUserCreationStrategy implements IUserCreationStrategy {
    constructor(private url: string) {}

    async createUser(data: Partial<UserAttributes >): Promise<any> {

        // console.log(data)
        const response = await axios.post(this.url, data, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // console.log(response)
        // if (response.status !== 201 || response.status !== 200) {
        //          throw new Error(`Failed to create user: ${response.status} ${response.statusText}`);
        //     }
        return response.data;
    }
}

export default AxiosUserCreationStrategy