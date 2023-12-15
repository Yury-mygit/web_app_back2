import express from 'express';
import studentController from "../../controllers/UserController";

const router = express.Router();

/**
 * @openapi
 * paths:
 *   /user:
 *     get:
 *       tags:
 *         - user
 *       summary: Your route summary
 *       description: Your route description
 *       parameters:
 *         - name: skip
 *           in: query
 *           description: Number of items to skip before starting to collect the result set
 *           required: false
 *           schema:
 *             type: integer
 *             format: int32
 *         - name: limit
 *           in: query
 *           description: Limits the number of items in the result set
 *           required: false
 *           schema:
 *             type: integer
 *             format: int32
 *         - name: user_id
 *           in: query
 *           description: Id of user
 *           required: false
 *           schema:
 *             type: integer
 *             format: int32
 *       responses:
 *         '200':
 *           description: Successful operation
 *
 *     post:
 *       tags:
 *         - user
 *       summary: Create a new student
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 parentsName:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 status:
 *                   type: string
 *
 *                 sessionTransferRate:
 *                   type: integer
 *                 percentageOfAbsences:
 *                   type: number
 *                 contactEmail:
 *                   type: string
 *                 contactTelephone:
 *                   type: string
 *                 allowTelegramNotification:
 *                   type: boolean
 *                 address:
 *                   type: string
 *                 foundUsThrough:
 *                   type: string
 *                 online:
 *                   type: boolean
 *                 notes:
 *                   type: string
 *
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
 *           '400':
 *             description: Bad request
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                     errorCode:
 *                       type: integer
 *                       description: Custom error code indicating the specific error
 *           '500':
 *             description: Internal server error
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                     errorCode:
 *                       type: integer
 *                       description: Custom error code indicating the specific error
 *
 *     patch:
 *       tags:
 *         - user
 *       summary: Update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 parentsName:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 status:
 *                   type: string
 *
 *                 sessionTransferRate:
 *                   type: integer
 *                 percentageOfAbsences:
 *                   type: number
 *                 contactEmail:
 *                   type: string
 *                 contactTelephone:
 *                   type: string
 *                 allowTelegramNotification:
 *                   type: boolean
 *                 address:
 *                   type: string
 *                 foundUsThrough:
 *                   type: string
 *                 online:
 *                   type: boolean
 *                 notes:
 *                   type: string
 *
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
 *           '400':
 *             description: Bad request
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                     errorCode:
 *                       type: integer
 *                       description: Custom error code indicating the specific error
 *           '500':
 *             description: Internal server error
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                     errorCode:
 *                       type: integer
 *                       description: Custom error code indicating the specific error
 *
 *     delete:
 *       tags:
 *          - user
 *       description: Fill database with test random data
 *       responses:
 *         200:
 *           description: Returns a success message.
 */

router.get('/', studentController.getAllStudents);

router.post('/', studentController.createStudent);

router.patch('/', studentController.updateStudent);

router.delete('/:id', studentController.deleteStudent);

export default router;