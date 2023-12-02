/*
Controller that fill db with fake data. Pay attention! Db will drop and fill with new fake data
*/

import Student_model from "../models/student_model";
import Session_model from "../models/session_model";
import Office_model from "../models/office_model";
import Employee_model from "../models/employee_model";
import Payment_model from "../models/payment_model";
import {faker} from "@faker-js/faker";
import { Op } from 'sequelize';

class FakeData_Controller {
    dropdata = async () => {
        try {
            await Student_model.sync({force: true})
            await Employee_model.sync({force: true})
            return true
        } catch (err) {
            return err || undefined
        }
    }

    studentfill = async ( number: number) => {
        try {
            for(let i = 0; i < number; i++) {
                let dateOfInitialDiagnosis = new Date();
                dateOfInitialDiagnosis.setDate(dateOfInitialDiagnosis.getDate() - 7);

                await Student_model.create({
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

    employeefill = async ( number: number) => {
        try {
            for(let i = 0; i < number; i++) {
                let dateOfInitialDiagnosis = new Date();
                dateOfInitialDiagnosis.setDate(dateOfInitialDiagnosis.getDate() - 7);

                await Employee_model.create({
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

    officeFill = async (number: number) => {
        try {
            for (let i = 0; i < number; i++) {
                await Office_model.create({
                    address: faker.location.streetAddress(),
                });
            }
            // throw new Error('fsfsff')
            return true
        } catch (err) {
            throw err;
        }
    }

    sessionFill = async (startDate?: Date, endDate?: Date) => {
        try {
            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

            // Set default values if not provided
            startDate = startDate || twoWeeksAgo;
            endDate = endDate || new Date();

            const students_local = await Student_model.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate
                    }
                }
            });
            const employeeCount = await Employee_model.count();

            const sessions: object[] = [];
            let uniqueIndex = 0;

            students_local.forEach((item) => {
                const session_number: number = this.getRandomElement([1, 2, 3]) || 1;
                for (let i = 0; i < session_number; i++) {
                    sessions.push({
                        'index': uniqueIndex,
                        'student_id': item.id,
                        'student_name': item.firstName
                    });
                    uniqueIndex++;
                }
            });

            console.log('sessions = ', sessions);

            return true;
        } catch (err) {
            return err || undefined;
        }
    }


    getRandomElement = <T>(array: T[]): T | undefined =>{
        if (array.length === 0) {
            return undefined;
        }

        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}

export default new FakeData_Controller()