import express from 'express';
import userControllerInstance from "./UserController";

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
router.get('/', userControllerInstance.getAllUser);


/**
 * @openapi
 * paths:
 *   /user:
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
 *                 name:
 *                   type: string
 *                   default: Иван
 *                 surname:
 *                   type: string
 *                   default: Иванов
 *                 parentsName:
 *                   type: string
 *                   default: Петр
 *                 age:
 *                   type: integer
 *                   default: 3
 *                 status:
 *                   type: string
 *                   default: active
 *                 sessionTransferRate:
 *                   type: integer
 *                   default: 0.1
 *                 percentageOfAbsences:
 *                   type: number
 *                   default: 0.1
 *                 contactEmail:
 *                   type: string
 *                   default: petr@yandex.ru
 *                 contactTelephone:
 *                   type: string
 *                   default:
 *                 allowTelegramNotification:
 *                   type: boolean
 *                   default: true
 *                 address:
 *                   type: string
 *                   default: город улица дом квартира
 *                 foundUsThrough:
 *                   type: string
 *                   default: от друзей
 *                 online:
 *                   type: boolean
 *                   default: true
 *                 notes:
 *                   type: string
 *                   default: может заниматься только в первой половине дня
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

 */
router.post('/', userControllerInstance.createUser.bind(userControllerInstance));

router.patch('/', userControllerInstance.updateUser);

router.delete('/:id', userControllerInstance.deleteUser);

export default router;