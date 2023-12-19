import ProductModel from "../models/product_model";
import { Request, Response } from 'express';
class ProductConrtoller {
    getAll =  async (req: any, res: any) => {
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
    }

    create = async (req: Request, res: Response) => {
        try {
            const { product_type, name, desc } = req.body;
            const newProduct = await ProductModel.create({ product_type, name, desc });
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(500).json({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
        }
    };

    // Method to update an existing product
    update = async (req: Request, res: Response) => {
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

    delete = async (req: Request, res: Response) => {
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

export default new ProductConrtoller()