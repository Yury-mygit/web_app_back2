import express from 'express';
import Store from "../../servises/store";
import UserController from "./UserController";
import UserService from "./UserService";
import CreateUserFactory from "./CreateUserFactory";
import API, {IAPIResponseFromStoreStrategy} from "../../servises/api";
import {StoreDebugger} from '../../debugger/StoreDebugger'
import Lackofdata from "../../servises/strategies/lackofdata";
export const store = new Store()
export const st = new StoreDebugger(store, 'store-changes.log');

import EventEmitter from "events";

// import {myEmitterInstance} from "../../core/actions/createAgent";

const userControllerInstance = new UserController({

    userService: new UserService(
        new CreateUserFactory()
    ),

    api:  new API({
        responseStrategy:new Lackofdata()
        }),

    store: store
    })

const router = express.Router();

import {core} from "../../app";


router.get('/getall', userControllerInstance.getAllUser.bind(userControllerInstance));
router.post('/getone', userControllerInstance.getOneUser.bind(userControllerInstance));


// router.post('/create' , userControllerInstance.createUser.bind(userControllerInstance))
// router.post('/create', core.agents.createAgent.user)
router.post('/create', (req, res)=> {

    // myEmitterInstance.emit('eventA', req, res);
})

router.patch('/update', userControllerInstance.updateUser.bind(userControllerInstance));
router.delete('/delete/:id', userControllerInstance.deleteUser.bind(userControllerInstance));
export default router;


/**
 * @openapi
 * paths:
 *   /user/getall:
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
 *   /user/getone:
 *     post:
 *       tags:
 *         - user
 *       summary: Your route summary
 *       description: Your route description
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *               oneOf:
 *                 - required: [user_id]
 *                   properties:
 *                     user_id:
 *                       type: string
 *                 - required: [telegram_id]
 *                   properties:
 *                     telegram_id:
 *                       type: string
 *               properties:
 *                 user_id:
 *                   type: string
 *                   default: Иван
 *                 telegram_id:
 *                   type: string
 *                   default: Иванов
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
 *
 *   /user/create:
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
 *         '201':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   user_id:
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
 *
 *   /user/update:
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
 *                 name:
 *                   type: string
 *                   default: Дима
 *                 surname:
 *                   type: string
 *                   default: Дмитриевич
 *                 parents:
 *                   type: string
 *                   default: Артур
 *                 age:
 *                   type: integer
 *                   default: 5
 *                 status:
 *                   type: string
 *                   default: active
 *                 attendance:
 *                   type: integer
 *                   default: 0.01
 *                 absences:
 *                   type: number
 *                   default: 0.01
 *                 email:
 *                   type: string
 *                   default: dima@yandex.ru
 *                 telephone:
 *                   type: string
 *                   default: +8739388384
 *                 online:
 *                   type: boolean
 *                   default: true
 *                 notes:
 *                   type: string
 *                   default: true
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
 *   /user/delete.{id}:
 *     delete:
 *       tags:
 *         - user
 *       summary: Delete a user
 *       description: Deletes a user by their unique ID.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: Unique ID of the user to delete.
 *       responses:
 *         200:
 *           description: User successfully deleted.
 *         404:
 *           description: User not found.
 */
