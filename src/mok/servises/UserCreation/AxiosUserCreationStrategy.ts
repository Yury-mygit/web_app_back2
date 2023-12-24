import axios from "axios";
import UserAttributes from "../../../subject/user/user_interface";


export interface IUserCreationStrategy {
    createUser(data: Partial<UserAttributes>): Promise<any>;
}

class AxiosUserCreationStrategy implements IUserCreationStrategy {
    constructor(private url: string) {}
    async createUser(data: Partial<UserAttributes >): Promise<any> {
        const response = await axios.post(this.url, data, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
}

export default AxiosUserCreationStrategy