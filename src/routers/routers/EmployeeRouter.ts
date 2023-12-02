import express from 'express';
import Employee_model from "../../models/employee_model";

const router = express.Router();

interface EmployeeInterface {
    status: string;
    position: string;
    profession: string;
    first_name: string;
    last_name: string;
    contact_email: string;
    contact_telephone: string;
    telegram_id: number;
    online: boolean;
    offline?: boolean;
}

interface response_int{
    id:number
}

/**
 * @openapi
 * paths:
 *   /employee/:
 *     get:
 *       tags:
 *         - Employee
 *       summary: The api for gathering offices
 *       description: The api for gathering offices
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
 */
router.get('/', async (req, res) => {
    try {
        const skip = parseInt(req.query.skip as string) || 0;
        const limit = parseInt(req.query.limit as string) || 100;

        const emploees = await Employee_model.findAll({
            offset: skip,
            limit: limit,
            order:['id']
        });

        res.json(emploees);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
// Define your students routes here

export default router;
