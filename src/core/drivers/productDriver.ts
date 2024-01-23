import BaseDriver, {IBaseEntity} from "./baseDriver";
import {ICreateProductFactory} from "../factories/CreateProductFactory";
import {ICreateUserDTO} from "../DTO/UserDTO";
import {Request, Response} from "express";
import ProductModel from "../models/product_model";

interface IProductDriver extends IBaseEntity{
    factory : ICreateProductFactory | undefined
    dto: ICreateUserDTO | undefined;
    model: any

    takeOne (req: Request, res: Response):Promise<void>;
    takeMany(req: Request, res: Response):Promise<void>;
    create(req: Request, res: Response) : Promise<void>;
    update(req: Request, res: Response) : Promise<void>;
    delete(req:Request, res: Response): Promise<void>;
}


export class ProductDriver extends BaseDriver implements IProductDriver {
    public factory !: ICreateProductFactory | undefined
    public dto !: ICreateUserDTO | undefined
    public model !: any

    constructor({
                    factory,
                    dto,
                    model,
                    // answerFilter
                }: ConstructorParams ) {
        super();
        this.factory = factory ||undefined
        this.dto = dto || undefined
        this.model = model || undefined
    }
    public takeOne =  async (req: Request, res: Response):Promise<void> => {};

    public takeMany =  async  (req: Request, res: Response):Promise<void> => {
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 20;

            const offices = await ProductModel.findAll({
                offset: skip,
                limit: limit,
                attributes: ['product_id', 'product_type', 'product_id', 'name', 'desc', 'createdAt'],
                order:['product_id']
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

    public create =  async (req: Request, res: Response) : Promise<void> => {

            const { product_type, name, cost, desc } = req.body;
            const newProduct = await this.save({
                model: this.model,
                data: {
                    product_type,
                    name,
                    cost,
                    desc
                }
            });
        const answer = this.answer(newProduct, ['product_id', 'name', 'cost', 'desc'])

        this.sendOkAnswer(answer, res)

    };
    public update =  async (req: Request, res: Response) : Promise<void> => {
        try {
            const { product_id } = req.params;
            const { product_type, name, desc } = req.body;
            const [updated] = await ProductModel.update({ product_type, name, desc }, {
                where: { product_id }
            });

            if (updated) {
                const updatedProduct = await ProductModel.findByPk(product_id);
                res.json(updatedProduct);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
        }
    };
    public delete =  async (req:Request, res: Response): Promise<void> => {
        try {
            const { product_id } = req.params;
            const deleted = await ProductModel.destroy({
                where: { product_id }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
        }
    };
}

export default ProductDriver
export {IProductDriver}


interface ConstructorParams {
    factory?: ICreateProductFactory;
    dto?: ICreateUserDTO;
    model?: any;
}