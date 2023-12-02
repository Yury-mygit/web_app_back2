import express from 'express';
import Office_model from '../../models/office_model'

const router = express.Router();

/**
 * @openapi
 * paths:
 *   /offices/:
 *     get:
 *       tags:
 *         - Office
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
        const limit = parseInt(req.query.limit as string) || 20;

        const offices = await Office_model.findAll({
            offset: skip,
            limit: limit,
            order:['id']
        });

        res.json(offices);
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