import {IStore} from "../store";
import { IAPIResponseFromStoreStrategy } from "../api";
import {Response} from "express";

export class LackOfData implements IAPIResponseFromStoreStrategy{

    private store!: IStore


    configureStore = (store:IStore) => {
        this.store = store
        // console.log(this.store)
    }
    async successStore(res: string, data: string):Promise<void> {
        const datas = this.store.getData(data)
        const resp = this.store.getData(res)


        await resp.status(201).json(datas);
    }

    async success(res: Response, data: any) {
        res.status(201).json(await data);
    }

    async error(res: Response, message: string, statusCode: number = 500) {
        res.status(statusCode).json({ error: message });
    }

    async lackOfDataError(test: string, statusCode: number = 500) {

        const res : Response = this.store.getData('res')

        res.status(statusCode).json({ error: test });
    }

    // async error(res: Response, message: string, statusCode: number = 500) {
    //     res.status(statusCode).json({ error: message });
    // }
}

export default LackOfData