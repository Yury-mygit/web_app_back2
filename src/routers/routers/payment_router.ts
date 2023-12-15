import express from 'express';
import controller from '../../controllers/Payment_Contriller'
import Validator from '../validators/Validator'

export const paymentsRouter = express.Router();

paymentsRouter.post('/getall', ...Validator.validateGetAllPays(), controller.getAllPays_v2);
paymentsRouter.post('/get_by_telegram_id', ...Validator.validate_get_by_telegram_id(), controller.getByTelegramID);
paymentsRouter.post('/create', ...Validator.validateCreatePay(), controller.createPay_v2);
paymentsRouter.patch('/update', ...Validator.validateUpdatePay(), controller.updatePay_v2);
paymentsRouter.delete("/delete",...Validator.validateDelete(), controller.deletePayment_v2);


/**
 * @openapi
 * paths:
 *   /payment/getall:
 *     post:
 *       tags:
 *         - Payment
 *       summary: Your route summary
 *       description: Your route description
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the student to update
 *                   default: 1
 *                 skip:
 *                   type: integer
 *                   description: skip
 *                   default: 0
 *                 limit:
 *                   type: integer
 *                   description: limit
 *                   default: 100
 *                required:
 *                 - user_id
 *                 - skip
 *                 - limit
 *       responses:
 *         '200':
 *           description: Successful operation
 *
 *   /payment/get_by_telegram_id:
 *     post:
 *       tags:
 *         - Payment
 *       summary: Your route summary
 *       description: Your route description
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                 telegram_id:
 *                   type: integer
 *                   description: The ID of the student to update
 *                   default: 1
 *                required:
 *                 - telegram_id
 *       responses:
 *         '200':
 *           description: Successful operation
 *
 *   /payment/update:
 *     patch:
 *       tags:
 *           - Payment
 *       summary: Update a new payment record
 *       description: Update a new payment record
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                 pay_id:
 *                   type: integer
 *                   description: The ID of the student to update
 *                   default: 1
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the student to update
 *                   default: 1
 *                 status:
 *                   type: string
 *                   description: type of payments
 *                   default: active
 *                 product_type:
 *                   type: string
 *                   description: type of payments
 *                   default: subscription_1
 *                required:
 *                 - pay_id
 *
 *       responses:
 *         '201':
 *           description: Student added successfully
 *
 *   /payment/create:
 *     post:
 *       tags:
 *           - Payment
 *       summary: Add a new payment
 *       description: Add a new pay to system
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the student to update
 *                   default: 1
 *                 product_type:
 *                   type: string
 *                   description: type of payments
 *                   default: subscription_1
 *                required:
 *                 - user_id
 *                 - product_type
 *       responses:
 *         '201':
 *           description: Student added successfully
 *
 *   /payment/delete:
 *     delete:
 *       tags:
 *           - Payment
 *       summary: Delete a payment
 *       description:  Delete a payment
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                 pay_id:
 *                   type: integer
 *                   description: The ID of the student to update
 *                   default: 1
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the student to update
 *                   default: 1
 *                 status:
 *                   type: string
 *                   description: type of payments
 *                   default: active
 *                 product_type:
 *                   type: string
 *                   description: type of payments
 *                   default: product_a
 *                required:
 *                 - pay_id
 *       responses:
 *         '200':
 *           description: Student updated successfully
 */