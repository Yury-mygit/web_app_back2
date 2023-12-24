import express from 'express';
import FakeDataController from "./fake_controller";
import Executor from "./servises/executor";
import Service from "./servises/service";
import Store from "../servises/store";
import AxiosUserCreationStrategy from "./servises/UserCreation/AxiosUserCreationStrategy";
import FakerUserDataGenerationStrategy from "./servises/DataGeneration/FakerUserDataGenerationStrategy";

const router = express.Router();

const fakeDataController = new FakeDataController(
    new Executor(
        new AxiosUserCreationStrategy("http://localhost:3002/user/create"),
        new FakerUserDataGenerationStrategy()
    ),
    new Service(
        new FakerUserDataGenerationStrategy()
    ),
    new Store()
)


router.post('/fill', fakeDataController.fill_data);

router.post('/users/fill', fakeDataController.userFill.bind(fakeDataController))
/**
 * @openapi
 * paths:
 *   /fake/users/fill:
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
 *                 number:
 *                   type: integer
 *                   description: The ID of the student to update
 *                   default: 2
 *                required:
 *                 - number
 *       responses:
 *         200:
 *           description: Returns a success message.
 *       parameters:
 *         id:
 *             type: integer
 *             description: The ID of the session.
 *
 */

router.post('/fill/payments', fakeDataController.fill_payments_by_fake_data)

/**
 * @openapi
 * paths:
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
 *                 number:
 *                   type: integer
 *                   description: The ID of the student to update
 *                   default: 4
 *                required:
 *                 - number
 *       responses:
 *         200:
 *           description: Returns a success message.
 *       parameters:
 *         id:
 *             type: integer
 *             description: The ID of the session.
 *
 */
router.post('/check', fakeDataController.check)

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