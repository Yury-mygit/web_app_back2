import express from 'express';
import fakeData_Controller from "../../controllers/fake_controller";

const router = express.Router();



router.post('/fill', fakeData_Controller.fill_data);

router.post('/fill/payments', fakeData_Controller.payments)

router.post('/check', fakeData_Controller.check)

export default router;


/**
 * @openapi
 * paths:
 *   /fake/fill:
 *     post:
 *       tags:
 *          - Fake routes
 *       description: Fill database with fake random data
 *       parameters:
 *          - in: query
 *            name: skip
 *            schema:
 *              type: integer
 *              default: 0
 *            description: The number of records to skip for pagination.
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *              default: 100
 *            description: The maximum number of records to return.
 *       responses:
 *         200:
 *           description: Returns a success message.
 *
 *   /fake/fill/payments:
 *     post:
 *       tags:
 *          - Fake routes
 *       description: Fill database with fake random data
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *
 *                required:
 *
 *       responses:
 *         200:
 *           description: Returns a success message.
 *
 *
 *
 *
 *   /fake/check:
 *     post:
 *       tags:
 *          - Fake routes
 *       description: Fill database with fake random data
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
 *       responses:
 *         200:
 *           description: Returns a success message.
 *       parameters:
 *         id:
 *             type: integer
 *             description: The ID of the session.
 *
 */