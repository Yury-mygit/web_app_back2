import express from 'express';
import ProductModel from "./product_model";
import controller from './product_controller'

const router = express.Router();

// Route to get all products
/**
 * @openapi
 * paths:
 *   /product/:
 *     get:
 *       tags:
 *         - Product
 *       summary: The api.ts for gathering products
 *       description: The api.ts for gathering products
 *       parameters:
 *         - name: skip
 *           in: query
 *           description: Number of items to skip before starting to collect the result set
 *           required: false
 *           schema:
 *             type: integer
 *             format: int32
 *           default: 0
 *         - name: limit
 *           in: query
 *           description: Limits the number of items in the result set
 *           required: false
 *           schema:
 *             type: integer
 *             format: int32
 *           default: 20
 *       responses:
 *         '200':
 *           description: Successful operation
 */
router.get('/', controller.getAll);

// Route to create a new product
/**
 * @openapi
 * /product/:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create a new product
 *     description: Add a new product to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - desc
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Server error
 */
router.post('/', controller.create);

// Route to update an existing product by product_id
/**
 * @openapi
 * /product/{product_id}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Update an existing product
 *     description: Update details of a product by product_id
 *     parameters:
 *       - name: product_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */
router.put('/:product_id', controller.update);

// Route to delete a product by product_id
/**
 * @openapi
 * /product/{product_id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete a product
 *     description: Delete a product from the database by product_id
 *     parameters:
 *       - name: product_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */
router.delete('/:product_id', controller.delete);





// router.get('/', controller.getAll);
// Define your students routes here

export default router