import express from 'express';
import StudentModel from '../../models/student-model';
import studentController from "../../controllers/student-controller";
import {faker} from "@faker-js/faker";

const router = express.Router();

const { getAll } = studentController;
const boundGetAll = getAll.bind(studentController);


/**
 * @openapi
 * paths:
 *   /students/:
 *     get:
 *       tags:
 *         - Student
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
router.get('/', boundGetAll);

/**
 * @openapi
 * /students/:
 *   post:
 *     tags:
 *       - Student
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               parentsName:
 *                 type: string
 *               age:
 *                 type: integer
 *               status:
 *                 type: string
 *
 *               sessionTransferRate:
 *                 type: integer
 *               percentageOfAbsences:
 *                 type: number
 *               contactEmail:
 *                 type: string
 *               contactTelephone:
 *                 type: string
 *               allowTelegramNotification:
 *                 type: boolean
 *               address:
 *                 type: string
 *               foundUsThrough:
 *                 type: string
 *               online:
 *                 type: boolean
 *               notes:
 *                 type: string
 *
 *
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                   errorCode:
 *                     type: integer
 *                     description: Custom error code indicating the specific error
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                   errorCode:
 *                     type: integer
 *                     description: Custom error code indicating the specific error
 */
router.post('/', async (req, res) => {
    const tempdata = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        parentsName: req.body.firstName,
        age: req.body.age,
        status: 'active',
        sessionTransferRate: 0.05,
        percentageOfAbsences: 0.02,
        contactEmail: req.body.contactEmail,
        contactTelephone: req.body.contactTelephone,
        dateOfInitialDiagnosis: req.body.dateOfInitialDiagnosis,
        address: req.body.address
    }

    try {
        const studentData = req.body;
        const student = await StudentModel.create(tempdata);
        res.json(student.id);
    } catch (err: any) {
        res.status(500).json(err)
    }
});

/**
 * @openapi
 * /students/:
 *   patch:
 *     tags:
 *       - Student
 *     summary: Update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               parentsName:
 *                 type: string
 *               age:
 *                 type: integer
 *               status:
 *                 type: string
 *
 *               sessionTransferRate:
 *                 type: integer
 *               percentageOfAbsences:
 *                 type: number
 *               contactEmail:
 *                 type: string
 *               contactTelephone:
 *                 type: string
 *               allowTelegramNotification:
 *                 type: boolean
 *               address:
 *                 type: string
 *               foundUsThrough:
 *                 type: string
 *               online:
 *                 type: boolean
 *               notes:
 *                 type: string
 *
 *
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                   errorCode:
 *                     type: integer
 *                     description: Custom error code indicating the specific error
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                   errorCode:
 *                     type: integer
 *                     description: Custom error code indicating the specific error
 */
router.patch('/', async (req, res) => {
    const tempdata = {

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        parentsName: req.body.firstName,
        age: req.body.age,
        status: 'active',
        sessionTransferRate: 0.05,
        percentageOfAbsences: 0.02,
        contactEmail: req.body.contactEmail,
        contactTelephone: req.body.contactTelephone,
        dateOfInitialDiagnosis: req.body.dateOfInitialDiagnosis,
        address: req.body.address
    }

    try {
        const studentId = req.body.id;
        await StudentModel.update(tempdata, { where: { id: studentId } });
        res.json({ message: 'StudentModel updated successfully' });
    } catch (err: any) {
        res.status(500).json(err)
    }
});

/**
 * @openapi
 * /test/fill:
 *   delete:
 *     tags:
 *        - Student
 *     description: Fill database with test random data
 *     responses:
 *       200:
 *         description: Returns a success message.
 */
router.delete('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        await StudentModel.destroy({ where: { id: studentId } });
        res.json({ message: 'StudentModel deleted successfully' });
    } catch (err: any) {
        res.status(500).json(err)
    }
});

export default router;