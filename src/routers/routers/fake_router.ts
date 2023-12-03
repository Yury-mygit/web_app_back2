import express from 'express';
import fakeData_Controller from "../../controllers/fake_controller";

const router = express.Router();


/**
 * @openapi
 * paths:
 *   /fake/fill:
 *     post:
 *       tags:
 *          - Fake routes
 *       description: Fill database with fake random data
 *       parameters:
 *          - in: query
 *            name: skip
 *            schema:
 *              type: integer
 *              default: 0
 *            description: The number of records to skip for pagination.
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *              default: 100
 *            description: The maximum number of records to return.
 *       responses:
 *         200:
 *           description: Returns a success message.
 *
 *   /fake/check:
 *     post:
 *       tags:
 *          - Fake routes
 *       description: Fill database with fake random data
 *       responses:
 *         200:
 *           description: Returns a success message.
 *       parameters:
 *         id:
 *             type: integer
 *             description: The ID of the session.
 *
 */
router.post('/fill', async (req, res) => {
    fakeData_Controller.dropdata(req).then(()=>
        Promise.all([
            fakeData_Controller.studentfill(5),
            fakeData_Controller.employeefill(3),
            fakeData_Controller.officeFill(2)
        ]))
    .then(()=>fakeData_Controller.sessionFill())
    .then(() => {
        res.status(200).json({ status: 'ok', desk: 'All good!!!' });
    })
    .catch((err) => {
        res.status(500).json({ status: 'error', desk: err.message || 'An unknown error occurred' });
    });

});



export default router;


