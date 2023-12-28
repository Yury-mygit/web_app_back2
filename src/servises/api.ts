import { Request, Response } from 'express';
import {IRequestStrategy} from "../mok/fake_controller";
import {IUserCreationStrategy} from "../mok/servises/UserCreation/AxiosUserCreationStrategy";
import UserAttributes from "../subject/user/user_interface";
import Log from "./debug";
import {IStore} from "./store";

export interface IAPI{
    setRequestStrategy(requestStrategy:IUserCreationStrategy ):void;
    setResponseStrategy(responseStrategy: IAPIResponseFromStoreStrategy): void;
    sendRequest(data: Partial<UserAttributes>): Promise<any>;
    success(res: Response, data: any): Promise<void>;
    success(data: string, target: string): Promise<void>;
    error(res: Response, e: any):void;
    lackOfDataError(test:string):void
    connectStore(store:IStore):void
}

export interface IAPIResponseFromStoreStrategy{
    successStore(res: string, data: string):Promise<void>;
    success(res: Response, data: any):void;
    configureStore  (store:IStore):void
    error(res: Response, message: string, statusCode?: number): void
    lackOfDataError(test:string):void
}


interface Constructor{
    responseStrategy?: IAPIResponseFromStoreStrategy,
    requestStrategy?: IUserCreationStrategy
}

class API implements IAPI {
    private responseStrategy?:  IAPIResponseFromStoreStrategy;
    private requestStrategy?: IUserCreationStrategy;

    private store!: IStore

    constructor({responseStrategy, requestStrategy}:Constructor) {
        if (responseStrategy) {
            this.responseStrategy = responseStrategy;

        }
        if (requestStrategy) {
            this.requestStrategy = requestStrategy;
        }

        // this.responseStrategy?.configureStore(this.store)
    }

    public connectStore = (store:IStore) => {
        this.store = store
        this.responseStrategy?.configureStore(this.store)
        // this.responseStrategy?.configureStore(this.store)
    }

    setRequestStrategy(requestStrategy: IUserCreationStrategy): void {
        this.requestStrategy = requestStrategy;
    }

    setResponseStrategy(responseStrategy: IAPIResponseFromStoreStrategy): void {
        this.responseStrategy = responseStrategy;
    }

    sendRequest = async (data: Partial<UserAttributes>): Promise<any> => {
        if (this.requestStrategy) {
            return this.requestStrategy.createUser(data);
        } else {
            // Handle the case where requestStrategy is not set
            throw new Error('Request strategy is not defined.');
        }
    }



    async success<T extends Response | string, U extends any | string>(res: T, data: U): Promise<void> {

        if (!this.responseStrategy) {
            Log("No response strategy");
            throw new Error('No response strategy');
        }

        // Check if 'res' is a string, which means we need to retrieve data from the store
        if (typeof res === 'string') {
            const storedRes = this.store.getData(res);
            const storedData = this.store.getData(data as string); // Cast 'data' to string because both 'res' and 'data' are strings in this case
            if (storedRes && storedData) {
                await this.responseStrategy.success(storedRes, storedData);
            } else {
                Log("Stored data not found for key:", res);
                throw new Error('Stored data not found');
            }
        }
        // Otherwise, 'res' is a Response object and 'data' is any type
        else if (typeof res === 'object' ) {
            await this.responseStrategy.success(res, data);
        } else {
            Log("Invalid arguments provided to success method");
            throw new Error('Invalid arguments provided to success method');
        }
    }

    async lackOfDataError(test:string) {

        await this.responseStrategy?.lackOfDataError(test);

    }

    async error(res: Response, e: any) {
        if (this.responseStrategy) {
            await this.responseStrategy.error(res, e);
        } else {
            // Handle case where responseStrategy is not set
        }
    }
}

export default API











// export interface IAPIResponse{
//     success(res: Response, data: any):void;
//     error(res: Response, message: string, statusCode?: number): void
// }
//
// export class APIResponse implements IAPIResponse{
//     async success(res: Response, data: any) {
//         res.status(201).json(await data);
//     }
//
//     async error(res: Response, message: string, statusCode: number = 500) {
//         res.status(statusCode).json({ error: message });
//     }
// }









// export class APIResponseFromStoreStrategy implements IAPIResponseFromStoreStrategy{
//
//     private store!: IStore
//
//     configureStore = (store:IStore) => {
//         this.store = store
//     }
//     async successStore(res: string, data: string):Promise<void> {
//         const datas = this.store.getData(data)
//         const resp = this.store.getData(res)
//
//
//         await resp.status(201).json(datas);
//     }
//
//     async success(res: Response, data: any) {
//         res.status(201).json(await data);
//     }
//
//     async error(res: Response, message: string, statusCode: number = 500) {
//         res.status(statusCode).json({ error: message });
//     }
//
//     // async error(res: Response, message: string, statusCode: number = 500) {
//     //     res.status(statusCode).json({ error: message });
//     // }
// }


