import express from 'express';
import controller from '../../controllers/payment_controller'
import { validationResult, body, query, checkSchema,  check, oneOf  } from 'express-validator';

export const paymentsRouter = express.Router();

export enum SubscriptionType {
    ONE_LESSON = 1,
    FOUR_LESSONS = 4,
    EIGHT_LESSONS = 8
}

// Middleware for error checking
const validate = () => {
    return [
        body('user_id').exists().withMessage('user_id is required'),
        body('user_id').isNumeric().toInt().withMessage('user_id must be a number'),
        body('user_id').custom((value:number) => value > 0 && value < 1000).withMessage('user_id must be greater than 0 and less than 1000'),
        body('skip').optional({ nullable: true, checkFalsy: true }).isNumeric().toInt().withMessage('skip must be a number'),
        body('limit').optional({ nullable: true, checkFalsy: true }).isNumeric().toInt().withMessage('limit must be a number'),
        (req: any, res: any, next: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },
        (req: any, res: any, next: any) => {
            const validProperties = ['user_id', 'skip', 'limit'];
            const extraProperties = Object.keys(req.body).filter(prop => !validProperties.includes(prop));
            if (extraProperties.length) {
                return res.status(400).json({ errors: `Invalid properties in request: ${extraProperties.join(', ')}` });
            }
            next();
        },
        (req: any, res: any, next: any) => {
            console.log(req.body)
            next();
        }
    ];
};
const validateCreate = () => {
    return [
        body('user_id').exists().withMessage('id is required'),
        body('user_id').isNumeric().toInt().withMessage('id must be a number'),
        body('pay_type').exists().withMessage('pay_type is required'),
        body('pay_type').custom((value) => Object.values(SubscriptionType).includes(value)).withMessage('Invalid pay_type'),
        (req: any, res: any, next: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },
        (req: any, res: any, next: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },
        (req: any, res: any, next: any) => {
            const validProperties = ['user_id', 'pay_type'];
            const extraProperties = Object.keys(req.body).filter(prop => !validProperties.includes(prop));
            if (extraProperties.length) {
                return res.status(400).json({ errors: `Extra field(s) in the request: ${extraProperties.join(', ')}` });
            }
            next();
        }
    ];
};

paymentsRouter.post('/createPay', ...validateCreate(), controller.createPay);
paymentsRouter.post('/get_all', ...validate(), controller.getAllPays);

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
 *                 pay_type:
 *                   type: string
 *                   description: type of payments
 *                   default: ONE_LESSON
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