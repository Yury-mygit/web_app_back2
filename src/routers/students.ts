import express from 'express';
import { Student } from '../models/Student';

const router = express.Router();

/**
 * @openapi
 * /students/:
 *   get:
 *     tags:
 *       - Student
 *     description: Returns all students
 *     responses:
 *       200:
 *         description: Returns a list of students.
 */
router.get('/', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

export default router;