import { Request, Response } from 'express';


class APIResponse {
    async success(res: Response, data: any) {
        res.status(201).json(await data);
    }

    async error(res: Response, message: string, statusCode: number = 500) {
        res.status(statusCode).json({ error: message });
    }
}

class API {
    private response: APIResponse;

    constructor(response: APIResponse) {
        this.response = response;
    }

    // res(): APIResponse {
    //     return this.response;
    // }
    async success(res: Response, data: any){
        await this.response.success(res, data)
    }
    async error(res: Response, e: any){
        await this.response.error(res, e)
    }
}

export default new API(new APIResponse())

