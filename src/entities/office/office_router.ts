import express from 'express';
import Office_model from './office_model'
import controller from './office_controller'

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
router.get('/', controller.getAll);
// Define your students routes here



export default router;