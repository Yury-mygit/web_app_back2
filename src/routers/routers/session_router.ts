import express from 'express';
import {ServiceType, Status } from "../../models/session_model";
import Session from "../../models/session_model"
import sessionController from "../../controllers/session_controller"

const router = express.Router();

// interface ISession {
//     id: number;
//     startDateTime: string;
//     duration: number;
//     week_first_day: string;
//     online: boolean;
//     paid: boolean;
//     confirmed: boolean;
//     student_id: number;
//     employee_id: number;
//     repeatable: boolean;
//     notes: string;
//     office_id: number;
//     performed: boolean;
//     serviceType: ServiceType;
//     status: Status;
//     payment_id: number;
// }

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
 *
 *     post:
 *       tags:
 *           - Session
 *       summary: Add a new student
 *       description: Add a new student to the session
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                 studentId:
 *                   type: integer
 *                   description: The ID of the student to update
 *                 newGrade:
 *                   type: string
 *                   description: The new grade for the student
 *                 newAddress:
 *                   type: string
 *                   description: The new address for the student
 *                required:
 *                 - studentId
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

router.get('/', sessionController.getAllStudents);
// Define your students routes here

router.patch('/',sessionController.updateStudent)

router.post('/', sessionController.createStudent)

router.delete('/', sessionController.deleteStudent)

export default router;