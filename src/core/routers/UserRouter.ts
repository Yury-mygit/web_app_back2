import express,{Request, Response} from 'express';
import Store from "../../servises/store";
import {StoreDebugger} from '../../debugger/StoreDebugger'
export const store = new Store()
export const st = new StoreDebugger(store, 'store-changes.log');

import {emiter} from "../core";

const router = express.Router();




router.post('/take/one/by_id',(req, res)=> {

    emiter.emit('TakeOneUserByIdEvent', req, res);
});

router.post('/take/one/by_telegram_id',(req: Request, res: Response)=> {

    emiter.emit('TakeOneUserByTelegramIdEvent', req, res);
});

router.post('/take/many', (req: Request, res: Response)=> {

    emiter.emit('TakeManyUsersEvent', req, res);
});

router.post('/create/one', (req: Request, res: Response)=> {

    emiter.emit('CreateOneUserEvent', req, res);
})

router.patch('/update/one', (req: Request, res: Response)=>{
        emiter.emit('UpdateOneUserEvent', req, res)
})

router.delete('/delete/one/:id',(req: Request, res: Response)=>{
    const id = req.params.id;
    console.log(id)
    emiter.emit('DeleteOneUserEvent', req, res)
})


export default router;




/**
 * @openapi
 * paths:
 *   /user/take/one/by_id:
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
 *              type: object
 *              properties:
 *                user_id:
 *                  type: number
 *                  default: 191
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
 *   /user/take/one/by_telegram_id:
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
 *              type: object
 *              properties:
 *                telegram_id:
 *                  type: number
 *                  default: 565047052
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
 *   /user/take/many:
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
 *               type: object
 *               properties:
 *                 limit:
 *                   type: number
 *                   default: 10
 *                 skip:
 *                   type: number
 *                   default: 0
 *
 *
 *       responses:
 *         '200':
 *           description: Successful operation
 *
 *   /user/create/one:
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
 *   /user/update/one:
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
 *                 user_id:
 *                   type: number
 *                   default: 191
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
 *   /user/delete/one/{id}:
 *     delete:
 *       tags:
 *         - user
 *       summary: Delete a user
 *       description: |
 *          Deletes a user by their unique ID. Provide the ID of the user to delete in the path.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           default: 200
 *           schema:
 *             type: integer
 *           description: Unique ID of the user to delete.
 *       responses:
 *         200:
 *           description: User successfully deleted.
 *         404:
 *           description: User not found.
 *         400:
 *            description: Bad request, ID parameter is missing or invalid.
 */



// router.post('/create' , userControllerInstance.createUser.bind(userControllerInstance))
// router.post('/create', core.agents.createAgent.user)