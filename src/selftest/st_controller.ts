import {NextFunction, Request, Response} from "express";
import axios from "axios";

class selfTestController {
    constructor() {
    }

    public testUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const results = [];

            // Call test methods and store results
            results.push({ test: 'takeUserByID', success: await this.test_takeUserByID() });
            results.push({ test: 'takeUserByTelegramID', success: await this.test_takeUserByTelegramID() });
            results.push({ test: 'takeManyUsersD', success: await this.test_takeManyUsersD() });
            results.push({ test: 'test_createUser', success: await this.test_createUser() });
            results.push({ test: 'test_deleteUserByID', success: await this.test_deleteUserByID() });


            // Count successful and failed tests
            const successCount = results.filter(result => result.success).length;
            const failureCount = results.length - successCount;

            // Prepare the response object with counts and individual test results
            const response = {
                title: 'User test',
                successCount,
                failureCount,
                results
            };

            // Send the response
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    private compareResults(actual: any, expected: any): boolean {
        // Implement comparison logic here
        // console.log(actual)
        // console.log(expected)
        return JSON.stringify(actual) === JSON.stringify(expected);
    }

    private async test_takeUserByID(): Promise<boolean> {
        try {
            const response = await axios.post('http://localhost:3002/user/take/one/by_id', {
                user_id: 191
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const isSuccess = response.data.status === 'ok' &&
                'user_id' in response.data.data &&
                'name' in response.data.data &&
                'surname' in response.data.data &&
                'age' in response.data.data;

            return isSuccess;
        } catch (error:any) {
            return false;
        }
    }

    private async test_takeUserByTelegramID(): Promise<boolean> {
        try {
            const response = await axios.post('http://localhost:3002/user/take/one/by_telegram_id', {
                telegram_id: 565047052
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // console.log(response)

            const isSuccess = response.data.status === 'ok' &&
                'user_id' in response.data.data &&
                'name' in response.data.data &&
                'surname' in response.data.data &&
                'age' in response.data.data;

            // console.log(isSuccess)

            return isSuccess;
        } catch (error:any) {
            return false;
        }
    }

    private async test_takeManyUsersD(): Promise<boolean> {
        const limit = 10; // Define the limit as a variable for reusability

        try {
            const response = await axios.post('http://localhost:3002/user/take/many', {
                limit: limit,
                skip: 0
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const isSuccess = response.data.status === 'ok' &&
                Array.isArray(response.data.data) &&
                response.data.data.length <= limit;

            // console.log(isSuccess)

            return isSuccess;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    private async test_createUser(): Promise<boolean> {
        const userData = {
            name: "Ivan",
            surname: "Ivanov",
            parentsName: "Peter",
            age: 3,
            status: "active",
            sessionTransferRate: 0.1,
            percentageOfAbsences: 0.1,
            contactEmail: "petr@yandex.ru",
            contactTelephone: null,
            allowTelegramNotification: true,
            address: "city street house apartment",
            foundUsThrough: "from friends",
            online: true,
            notes: "can only study in the morning"
        };

        try {
            const response = await axios.post('http://localhost:3002/user/create/one', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const resultData = response.data;
            const isSuccess = resultData &&
                typeof resultData.user_id === 'number' &&
                resultData.name === userData.name &&
                resultData.surname === userData.surname &&
                resultData.age === userData.age &&
                resultData.status === userData.status;

            return isSuccess;
        } catch (error:any) {
            console.error(error);
            return false;
        }
    }

    private async test_deleteUserByID(): Promise<boolean> {
        const userId = 200; // The ID of the user to delete

        try {
            const response = await axios.delete(`http://localhost:3002/user/delete/one/${userId}`, {
                headers: {
                    'accept': '*/*'
                }
            });

            const isSuccess = response.data.message === 'Entry deleted successfully';
            return isSuccess;
        } catch (error: any) {
            console.error(error);
            return false;
        }
    }
}

export default selfTestController