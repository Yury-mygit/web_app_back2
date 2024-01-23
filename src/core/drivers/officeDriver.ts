import BaseDriver, {IBaseEntity} from "./baseDriver";
import {Request, Response} from "express";
import Office_model from "../models/office_model";

interface IOfficeDriver extends IBaseEntity{
    takeOne (req: Request, res: Response):Promise<void>;
    takeMany(req: Request, res: Response):Promise<void>;
    create(req: Request, res: Response) : Promise<void>;
    update(req: Request, res: Response) : Promise<void>;
    delete(req:Request, res: Response): Promise<void>;
    validate(data: any):any
}

class OfficeDriver extends BaseDriver implements IOfficeDriver{
    sayHello = () => {
        console.log("Hello from Office")
    }
    public validate() {
        console.log('validate Payment')
    }

    public takeOne =  async (req: Request, res: Response):Promise<void> => {};
    public takeMany =  async  (req: Request, res: Response):Promise<void> => {
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 20;

            const offices = await Office_model.findAll({
                offset: skip,
                limit: limit,
                order:['id']
            });

            res.json(offices);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    };
    public create =  async (req: Request, res: Response) : Promise<void> => {};
    public update =  async (req: Request, res: Response) : Promise<void> => {};
    public delete =  async (req:Request, res: Response): Promise<void> => {};
}


export default OfficeDriver
export {IOfficeDriver}