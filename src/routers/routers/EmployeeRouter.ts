import express from 'express';
import Employee from "../../models/Employee";

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

router.get('/', async (req, res) => {
    try {
        const skip = parseInt(req.query.skip as string) || 0;
        const limit = parseInt(req.query.limit as string) || 100;

        const emploees = await Employee.findAll({
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
