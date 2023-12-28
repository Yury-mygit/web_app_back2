import express from 'express';
import Office_model from './office_model'
import controller from './office_controller'

const router = express.Router();

import {core} from "../../app";

router.get('/', controller.getAll);
router.post('/create', core.agents.createAgent.office);




export default router;

/**
 * @openapi
 * paths:
 *   /offices/:
 *     get:
 *       tags:
 *         - Office
 *       summary: The api.ts for gathering offices
 *       description: The api.ts for gathering offices
 *       parameters:
 *         - name: skip
 *           in: query
 *           description: Number of items to skip before starting to collect the result set
 *           required: false
 *           schema:
 *             type: integer
 *             format: int32
 *           default: 0
 *         - name: limit
 *           in: query
 *           description: Limits the number of items in the result set
 *           required: false
 *           schema:
 *             type: integer
 *             format: int32
 *           default: 20
 *       responses:
 *         '200':
 *           description: Successful operation
 *
 *   /offices/create:
 *     post:
 *       tags:
 *         - Office
 *       summary: Create a new office
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                   default: Ивантеевская 6
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
 *   /offices/update:
 *     patch:
 *       tags:
 *         - Office
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
 *   /offices/delete.{id}:
 *     delete:
 *       tags:
 *         - Office
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