import express, {Request, Response} from "express";

import selfTestController from './st_controller'

const test = new selfTestController()

const router = express.Router();

router.get('/test/user', test.testUser);

export default router


/**
 * @openapi
 * paths:
 *   /test/test/user:
 *     get:
 *       tags:
 *         - Test user
 *       summary: The api.ts for gathering offices
 *       description: The api.ts for gathering offices
 *
 *       schema:
 *          type: string
 *          description: The ID of the user to test
 *
 *       responses:
 *         '200':
 *           description: Successful operation
 */
