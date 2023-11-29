import express from 'express';
import { Student } from '../models/Student';
import { faker } from '@faker-js/faker';
import {sequelize} from '../database/database'

const router = express.Router();

/**
 * @openapi
 * /test/fill:
 *   post:
 *     description: Fill Students with random data
 *     responses:
 *       200:
 *         description: Returns a success message.
 */
router.post('/fill', async (req, res) => {
    try {

        await sequelize.sync({ force: true });

        for(let i = 0; i < 12; i++) {
            let dateOfInitialDiagnosis = new Date();
            dateOfInitialDiagnosis.setDate(dateOfInitialDiagnosis.getDate() - 7);

            await Student.create({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                parentsName: faker.person.firstName(),
                age: faker.number.int({min: 3, max: 50}),
                status: 'active',
                sessionTransferRate: 0.05,
                percentageOfAbsences: 0.02,
                contactEmail: faker.internet.email(),
                contactTelephone: faker.phone.number(),
                dateOfInitialDiagnosis: dateOfInitialDiagnosis.toISOString(),
                address: faker.location.streetAddress()
            });
        }
        res.send('Successfully filled Students with random data!');
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

export default router;