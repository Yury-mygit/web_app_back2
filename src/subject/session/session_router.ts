import express from 'express';
import sessionController from "./session_controller"

const router = express.Router();

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
 *   /session/fulfill:
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
 *         '200':
 *           description: Student updated successfully
 */

router.get('/', sessionController.getAllSessions);
router.patch('/',sessionController.updateSession)
router.post('/', sessionController.createSession)
router.delete('/', sessionController.deleteSession)

router.post("/fulfill", sessionController.fulfill)

export default router;

