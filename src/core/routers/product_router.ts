import express, {Request, Response} from 'express';
import {emiter} from "../core";

const router = express.Router();


router.post('/take/one/by_id', (req: Request, res: Response )=>
    emiter.emit("letTakeOneProductEvent",req, res));
router.post('/take/many', (req: Request, res: Response )=>
    emiter.emit("letTakeManyProductEvent",req, res));
router.post('/create/one', (req: Request, res: Response )=>
    emiter.emit("letCreateProductEvent",req, res));
router.patch('/update', (req: Request, res: Response )=>
    emiter.emit("letUpdateProductEvent",req, res));
router.delete('/update/one', (req: Request, res: Response )=>
    emiter.emit("letDeleteProductEvent",req, res));


/**
 * @openapi
 * paths:
 *   /product/take/one/by_id:
 *    post:
 *       tags:
 *         - Product
 *       summary: Your route summary
 *       description: Your route description
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   type: number
 *                   default: 100
 *
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *
 *
 *   /product/take/many:
 *     post:
 *       tags:
 *         - Product
 *       summary: take many products
 *       description: take many products
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 limit:
 *                   type: number
 *                   default: 10
 *                 skip:
 *                   type: number
 *                   default: 0
 *       responses:
 *         '200':
 *           description: Successful operation
 *
 *   /product/create/one:
 *     post:
 *       tags:
 *         - Product
 *       summary: Update an existing product
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_type:
 *                   type: string
 *                   default: subscribe
 *                 name:
 *                   type: string
 *                   default: 8 units
 *                 cost:
 *                   type: number
 *                   default: 7200
 *                 desc:
 *                   type: string
 *                   default: абонемент на 8 занятий
 *       responses:
 *         '200':
 *           description: Product updated successfully
 *         '404':
 *           description: Product not found
 *         '500':
 *           description: Server error
 *
 *   /product/update/one:
 *     patch:
 *       tags:
 *         - Product
 *       summary: Update an existing product
 *       description: Update details of a product by product_id
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_type:
 *                   type: string
 *                   default: subscribe
 *                 name:
 *                   type: string
 *                   default: 8 units
 *                 cost:
 *                   type: number
 *                   default: 7200
 *                 desc:
 *                   type: string
 *                   default: абонемент на 8 занятий
 *       responses:
 *         '200':
 *           description: Product updated successfully
 *         '404':
 *           description: Product not found
 *         '500':
 *           description: Server error
 *
 *   /product/delete:
 *     delete:
 *       tags:
 *         - Product
 *       summary: Delete a product
 *       description: Delete a product from the database by product_id
 *       parameters:
 *         - name: product_id
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: Product deleted successfully
 *         '404':
 *           description: Product not found
 *         '500':
 *           description: Server error
 */






// router.get('/', controller.getAll);
// Define your students routes here

export default router