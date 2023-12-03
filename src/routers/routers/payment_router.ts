import express from 'express';
import controller from '../../controllers/payment_controller'
import { validationResult, body, query, checkSchema,  check, oneOf  } from 'express-validator';

const validationSchema:any = {
    user_id: {
        in: [ 'body'], // use 'as const' to narrow the type to Location[]
        errorMessage: 'user_id must be a number',
        isNumeric: true,
        notEmpty: true,
        toInt: true
    },
    skip: {
        in: [ 'body'], // use 'as const' to narrow the type to Location[]
        errorMessage: 'skip must be a number',
        isNumeric: true,
        toInt: true
    },
    limit: {
        in: [ 'body'], // use 'as const' to narrow the type to Location[]
        errorMessage: 'limit must be a number',
        isNumeric: true,
        toInt: true
    }
};

export const paymentsRouter = express.Router();

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
 *                required:
 *                 - user_id
 *       responses:
 *         '200':
 *           description: Successful operation
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
 *                 pay_type:
 *                   type: string
 *                   description: type of payments
 *                required:
 *                 - user_id
 *                 - pay_type
 *       responses:
 *         '201':
 *           description: Student added successfully

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

paymentsRouter.post('/get_all',
    checkSchema(validationSchema),
    (req:any , res:any, next:any) => {
        controller.getAllPays(req, res, next);
    });

// export  router;