import express from 'express';
import {ServiceType, Status } from "../../models/session_model";
import Session from "../../models/session_model"
import sessionController from "../../controllers/session_controller"

const router = express.Router();

interface ISession {
    id: number;
    startDateTime: string;
    duration: number;
    week_first_day: string;
    online: boolean;
    paid: boolean;
    confirmed: boolean;
    student_id: number;
    employee_id: number;
    repeatable: boolean;
    notes: string;
    office_id: number;
    performed: boolean;
    serviceType: ServiceType;
    status: Status;
    payment_id: number;
}

/**
 * @openapi
 * paths:
 *   /session/:
 *     get:
 *       tags:
 *         - Session
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
 *       responses:
 *         '200':
 *           description: Successful operation
 */
router.get('/', sessionController.getAllStudents);
// Define your students routes here

export default router;