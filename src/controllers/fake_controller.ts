/*
Controller that fill db with fake data. Pay attention! Db will drop and fill with new fake data
*/

import Student_model from "../models/student_model";
import Session_model, {I_Session, ServiceType, Status} from "../models/session_model";
import Office_model from "../models/office_model";
import Employee_model from "../models/employee_model";
import {faker, tr} from "@faker-js/faker";
import {Op} from 'sequelize';
import {l} from '../servises/serv'
class FakeData_Controller {

    private property1: string;
    private property2: number;
    private dateOfInitialDiagnosis: Date;

    constructor(property1: string = '', property2: number = 0) {
        this.property1 = property1;
        this.property2 = property2;

        this.dateOfInitialDiagnosis = new Date()
        this.dateOfInitialDiagnosis.setDate(this.dateOfInitialDiagnosis.getDate() - 13);
    }

    dropdata = async (req:any) => {

        this.property1 = req.body.property1;
        this.property2 = req.body.property2;

        try {
            await Student_model.sync({force: true})
            await Employee_model.sync({force: true})
            await Office_model.sync({force:true})
            await Session_model.sync({force:true})
            return true
        } catch (err) {
            return err || undefined
        }
    }

    studentfill = async ( number: number) => {

        const data = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            parentsName: faker.person.firstName(),
            age: faker.number.int({min: 3, max: 50}),
            status: 'active',
            sessionTransferRate: 0.05,
            percentageOfAbsences: 0.02,
            contactEmail: faker.internet.email(),
            contactTelephone: faker.phone.number(),
            dateOfInitialDiagnosis: this.dateOfInitialDiagnosis.toISOString(),
            address: faker.location.streetAddress()
        }

        try {
            for(let i = 0; i < number; i++) {
                await Student_model.create(data);
            }
            return true;
        } catch (err) {
            return err || undefined
        }
    }

    employeefill = async ( number: number) => {
        try {
            for(let i = 0; i < number; i++) {

                await Employee_model.create({
                    status:'active',
                    position:'speech therapist',
                    profession:'speech therapist',
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    contact_email: faker.internet.email(),
                    contact_telephone: faker.phone.number().toString(),
                    telegram_id: faker.number.int({ min: 10000, max: 99999 }),
                    offline: true,
                    online: true,
                    qualifications: 'Higher education',
                    experience_years: 5

                });
            }
            return true
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
                return err;
            } else {
                console.error('An unexpected error occurred');
                return new Error('An unexpected error occurred');
            }
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
        // l('sessionFill work')
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

            const employees_local = await Employee_model.findAll();

            if (!employees_local || employees_local.length === 0) {
                throw new Error('employees_local is undefined or empty');
            }

            const offices_local = await Office_model.findAll();

            if (!offices_local || offices_local.length === 0) {
                throw new Error('offices_local is undefined or empty');
            }

            interface Isession {
                index: number;
                student_id: number;
                employee_id: number;
                student_name: string;
                office_id: number;
                day:number;
                time:number;
            }

            const sessions: Isession[] = [];
            let uniqueIndex = 0;
            const uniqueTimes = new Set();

            students_local.forEach((item) => {
                const session_number: number = this.getRandomElement([1, 2, 3]) || 1;

                for (let i = 0; i < session_number; i++) {
                    const randomEmployee = this.getRandomElement(employees_local);

                    let randomDay;
                    let randomHour;
                    let timeString;

                    do {
                        randomDay = this.getRandomElement2([0,1,2,3,4,5,6]);
                        randomHour = this.getRandomElement2([9,10,11,12,13,14,15,16,17,18,18,20]);

                        // Create a string that represents the day and hour
                        console.log(`${randomDay}-${randomHour}`)
                        timeString = `${randomDay}-${randomHour}`;
                    } while (uniqueTimes.has(timeString));




                    if (!randomEmployee) {
                        throw new Error('No employee found');
                    }
                    const randomOffice = this.getRandomElement(offices_local);
                    if (!randomOffice) {
                        throw new Error('No employee found');
                    }

                    sessions.push({
                        'index': uniqueIndex,
                        'student_id': item.id,
                        'employee_id': randomEmployee.id, // Now it's guaranteed not to be undefined
                        'student_name': item.firstName,
                        'office_id':randomOffice.id,
                        'day':randomDay,
                        'time': randomHour,
                    });
                    uniqueIndex++;
                }
            });


            for (const session of sessions) {

                const date = new Date();
                const currentDay = date.getUTCDay();  // Get the current day of the week (0-6)
                const daysToAdd = ((session.day - currentDay) + 7) % 7; // Calculate the number of days to add or subtract
                date.setUTCDate(date.getUTCDate() + daysToAdd);  // Set the day of the week


                date.setUTCHours(session.time-3, 0, 0, 0); // The minutes, seconds, and milliseconds are set to 0 // Set the hour


                const moscowTime = date.toLocaleString('en-US', { timeZone: 'Europe/Moscow' });; // Get the time in the Moscow time zone

                console.log(moscowTime)

                const ses: Partial<I_Session>  = {
                    startDateTime: moscowTime,
                    duration: 40,
                    week_first_day: '<placeholder>',
                    online: true,
                    paid: true,
                    confirmed: true,
                    student_id: session.student_id,
                    employee_id: session.employee_id,
                    repeatable: true,
                    notes: '<placeholder>',
                    office_id: session.office_id,
                    performed: true,
                    serviceType: ServiceType.log,
                    status: Status.active,
                    payment_id: 1,
                }
                // console.log(typeof (ses.startDateTime));
                await Session_model.create(ses);
            }




            // console.log('sessions = ', sessions);

            return true;
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
                return err;
            } else {
                console.error('An unexpected error occurred');
                return new Error('An unexpected error occurred');
            }
        }
    }


    getRandomElement = <T>(array: T[]): T | undefined =>{
        if (array.length === 0) {
            return undefined;
        }

        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    getRandomElement2 = <T>(array: T[]): T  =>{
        // if (array.length === 0) {
        //     return 0;
        // }

        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}

export default new FakeData_Controller()