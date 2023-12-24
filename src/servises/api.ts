import { Request, Response } from 'express';
import {IRequestStrategy} from "../mok/fake_controller";
import {IUserCreationStrategy} from "../mok/servises/UserCreation/AxiosUserCreationStrategy";
import UserAttributes from "../subject/user/user_interface";
import Log from "./debug";
import {IStore} from "./store";

export interface IAPI{
    setRequestStrategy(requestStrategy:IUserCreationStrategy ):void;
    setResponseStrategy(responseStrategy: IAPIResponse): void;
    sendRequest(data: Partial<UserAttributes>): Promise<any>;
    success(res: Response, data: any):void;
    error(res: Response, e: any):void;
}

interface Constructor{
    responseStrategy?: IAPIResponse,
    requestStrategy?: IUserCreationStrategy
}

class API implements IAPI {
    private responseStrategy?: IAPIResponse;
    private requestStrategy?: IUserCreationStrategy;

    constructor({responseStrategy, requestStrategy}:Constructor) {
        if (responseStrategy) {
            this.responseStrategy = responseStrategy;
        }
        if (requestStrategy) {
            this.requestStrategy = requestStrategy;
        }
    }

    setRequestStrategy(requestStrategy: IUserCreationStrategy): void {
        this.requestStrategy = requestStrategy;
    }

    setResponseStrategy(responseStrategy: IAPIResponse): void {
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



    async success(res: Response, data: any) {
        if (!this.responseStrategy) Log("No response strategy")
        if (this.responseStrategy) {
            await this.responseStrategy.success(res, data);
        } else {
            // Handle case where responseStrategy is not set
        }
    }

    async success_(res: string, data: string) {
        if (!this.responseStrategy) Log("No response strategy")
        if (this.responseStrategy) {
            await this.responseStrategy.success(res, data);
        } else {
            // Handle case where responseStrategy is not set
        }
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




export interface IAPIResponse{
    success(res: Response, data: any):void;
    error(res: Response, message: string, statusCode?: number): void
}

export class APIResponse implements IAPIResponse{
    async success(res: Response, data: any) {
        res.status(201).json(await data);
    }

    async error(res: Response, message: string, statusCode: number = 500) {
        res.status(statusCode).json({ error: message });
    }
}


export interface APIResponseFromStore{
    success(res: string, data: string):Promise<void>;
    configureStore  (store:IStore):void
    // error(res: Response, message: string, statusCode?: number): void
}


export class APIResponseFromStore implements APIResponseFromStore{

    private store!: IStore

    configureStore = (store:IStore) => {
        this.store = store
    }
    async success(res: string, data: string):Promise<void> {
        const datas = this.store.getData(data)
        const resp = this.store.getData(res)


        await resp.status(201).json(datas);
    }

    // async error(res: Response, message: string, statusCode: number = 500) {
    //     res.status(statusCode).json({ error: message });
    // }
}


