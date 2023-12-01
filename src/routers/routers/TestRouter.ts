import express from 'express';
import { StudentModel } from '../../models/StudentModel';
import { faker } from '@faker-js/faker';
import {sequelize} from '../../database/database'
import Employee from "../../models/Employee";
import Office from "../../models/Office";
import Payment, { PaymentStatus, SubscriptionType} from "../../models/Payment";
import {error} from "winston";

const router = express.Router();

function getRandomElement<T>(array: T[]): T | undefined {
    if (array.length === 0) {
        return undefined;
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

/**
 * @openapi
 * /test/fill:
 *   post:
 *     tags:
 *        - Test routes
 *     description: Fill database with test random data
 *     responses:
 *       200:
 *         description: Returns a success message.
 */
router.post('/fill', async (req, res) => {
    dropdata().then(()=>Promise.all([studentfill(5), employeefill(3), officeFill(2),]))
    .then(()=>sessionFill())
    .then(() => {
        res.status(200).json({ status: 'ok', desk: 'All good' });
    })
    .catch((err) => {
        res.status(500).json({ status: 'error', desk: err.message || 'An unknown error occurred' });
    });

});

const studentfill = async ( number: number) => {
    try {
        for(let i = 0; i < number; i++) {
            let dateOfInitialDiagnosis = new Date();
            dateOfInitialDiagnosis.setDate(dateOfInitialDiagnosis.getDate() - 7);

            await StudentModel.create({
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
        return true;
    } catch (err) {
        return err || undefined
    }
}
const employeefill = async ( number: number) => {
    try {
        for(let i = 0; i < number; i++) {
            let dateOfInitialDiagnosis = new Date();
            dateOfInitialDiagnosis.setDate(dateOfInitialDiagnosis.getDate() - 7);

            await Employee.create({
                status:'active',
                position:'speech therapist',
                profession:'speech therapist',
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                contact_email: faker.internet.email(),
                contact_telephone: faker.phone.number(),
                telegram_id: faker.number.int(),
                online: true,
                offline: true,
                qualifications: 'Higher education',
                experience_years: 5

            });
        }
        return true
    } catch (err) {
        return err || undefined
    }
}
const officeFill = async (number: number) => {
    try {
        for (let i = 0; i < number; i++) {
            await Office.create({
                address: faker.location.streetAddress(),
            });
        }
        // throw new Error('fsfsff')
        return true
    } catch (err) {
        throw err;
    }
}

const sessionFill = async () => {

    try {

        const students_local = await StudentModel.findAll();
        const employeeCount = await Employee.count();

        const sessions:object[] = []

        students_local.map(item=>{
            const session_number: number = getRandomElement([1,2,3]) || 1;
            sessions.
              push(...Array(session_number).
              fill({
                'student_id':item.id,
                'student_name':item.firstName
              }));
        })

        console.log('sessions = ',sessions, sessions[3]);


        return true
    } catch (err) {
        return err || undefined
    }
}
const paymentFill = async (res: any, number: number) => {
    try {
        const students = await StudentModel.findAll(); // Fetch all existing students
        const studentIds = students.map((student) => student.id); // Extract student ids

        for (let i = 0; i < number; i++) {
            const randomStudentId = getRandomElement(studentIds)

            await Payment.create({
                student_id: randomStudentId,
                status: PaymentStatus.NEW,
                subscription_type: SubscriptionType.ONE_LESSON
            });
        }
    }  catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}
const dropdata = async () => {
    try {
        await StudentModel.sync({force: true})
        await Employee.sync({force: true})
        return true
    } catch (err) {
        // if (err instanceof Error) {
        //     res.status(500).json({ error: err.message });
        // } else {
        //     res.status(500).json({ error: 'An unknown error occurred' });
        // }
        return err || undefined
    }
}



export default router;


