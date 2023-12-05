import express from 'express';
import controller from '../../controllers/PaymentRouteHandler'
import Validator from '../validators/Validator'

export const paymentsRouter = express.Router();

paymentsRouter.post('/get_all', ...Validator.validateGetAllPays(), controller.getAllPays);
paymentsRouter.post('/createPay', ...Validator.validateCreatePay(), controller.createPay);
paymentsRouter.post('/update', ...Validator.validateCreatePay(), controller.updatePay);
paymentsRouter.delete("/delete",...Validator.validateDelete(), controller.deletePayment);
/**
 * @openapi
 * paths:
 *   /payment/get_all:
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
 *   /payment/update:
 *     post:
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
 *                   default: product_a
 *                required:
 *                 - pay_id
 *
 *       responses:
 *         '201':
 *           description: Student added successfully
 *
 *     patch:
 *       tags:
 *           - Session
 *       summary: Update a student
 *       description: Update an existing student's information
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       responses:
 *         '200':
 *           description: Student updated successfully
 *
 *   /payment/createPay:
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
 *                   default: product_a
 *                required:
 *                 - user_id
 *                 - product_type
 *       responses:
 *         '201':
 *           description: Student added successfully
 *
 *     patch:
 *       tags:
 *           - Session
 *       summary: Update a student
 *       description: Update an existing student's information
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       responses:
 *         '200':
 *           description: Student updated successfully
 */