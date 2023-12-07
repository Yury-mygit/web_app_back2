/*
Controller that fill db with fake data. Pay attention! Db will drop and fill with new fake data
*/

import User_model from "../models/user/user_model";
import UserAttributes, {UserCreationAttributes, UserStatus} from "../interface/user_interface"
import SessionAttributes from "../interface/session_interfases";
import Session_model, {ServiceType, Status} from "../models/session_model";
import Office_model, {OfficeAttributes} from "../models/office_model";
import Employee_model, {StaffAttributes} from "../models/employee_model";
import {faker} from "@faker-js/faker";
import {Op} from 'sequelize';

import PayHandler from '../database/handlers/PaymentDataHandler'

const payHandler = new PayHandler

type CustomSessionAttributes = Partial<SessionAttributes> & {
    student_name?:string;
    index?:number;
    day: number;
    time: number;
};

type UserSubset = {
    user_id: number;
    name: string;
    status: UserStatus; // Use the UserStatus type here
};

class FakeData_Controller {

    private property1: string;
    private property2: number;
    private dateOfInitialDiagnosis: Date;

    services: {
        usersData: (startDate: Date, endDate: Date) => Promise<UserSubset[]>;
    };

    constructor(property1: string = '', property2: number = 0) {
        this.property1 = property1;
        this.property2 = property2;

        this.services = {
            usersData: this.userDataloader.bind(this)
        };

        this.dateOfInitialDiagnosis = new Date()
        this.dateOfInitialDiagnosis.setDate(this.dateOfInitialDiagnosis.getDate() - 13);
    }

    private userDataloader = async (startDate: Date, endDate: Date): Promise<UserSubset[]> => {
        try {
            const users = await User_model.findAll({
                attributes: ['user_id', 'name', 'status'], // Select specific attributes
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate
                    },
                }
            });

            // Map over the results to format the array structure
            return users.map(user => ({
                user_id: user.get('user_id') as number,
                name: user.get('name') as string,
                status: user.get('status') as UserStatus // Cast to UserStatus type
            }));
        } catch (err) {
            return this.handleError(err, 'Error during loading students');
        }
    };


    private handleError(err: unknown, message: string): never {
        console.error(message);
        if (err instanceof Error) {
            console.error(err.message);
            throw err; // Rethrow the error to maintain the stack trace
        } else {
            throw new Error('An unexpected error occurred');
        }
    }

    dropdata = async (req:any) => {

        this.property1 = req.body.property1;
        this.property2 = req.body.property2;

        try {
            await User_model.sync({force: true})
            await Employee_model.sync({force: true})
            await Office_model.sync({force:true})
            await Session_model.sync({force:true})
            return true
        } catch (err) {
            return err || undefined
        }
    }

    studentfill = async ( number: number) => {

        const data :UserCreationAttributes = {
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            parents: faker.person.firstName(),
            age: faker.number.int({min: 3, max: 50}),
            status: UserStatus.ACTIVE,
            attendance: 0.05,
            absences: 0.02,
            email: faker.internet.email(),
            telephone: faker.phone.number(),
            issue:'Постановка звука Р',
            initial_diagnosis_date: this.dateOfInitialDiagnosis.toISOString(),
            address: faker.location.streetAddress()
        }

        try {
            for(let i = 0; i < number; i++) {
                await User_model.create(data);
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

        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        // Set default values if not provided
        startDate = startDate || twoWeeksAgo;
        endDate = endDate || new Date();

        let users_local: Partial<UserAttributes>[]
        let staff_local: StaffAttributes[]
        let offices_local: OfficeAttributes[]
        let sessions_local: StaffAttributes[]



        users_local = await this.services.usersData(startDate, endDate)



        try {
            const employees_local = await Employee_model.findAll();

            if (!employees_local || employees_local.length === 0) {
                throw new Error('employees_local is undefined or empty');
            }
        } catch (err) {return this.handleError(err, 'Error during loading employee')}

        try{
            const offices_local = await Office_model.findAll();

            if (!offices_local || offices_local.length === 0) {
                throw new Error('offices_local is undefined or empty');
            }
        } catch (err) {return this.handleError(err, 'Error during loading offices')}






            // const sessions: Isession[] = [];
            const sessions: CustomSessionAttributes[] = [];






            let uniqueIndex = 0;
            const uniqueTimes = new Set();

            users_local.forEach((stud_loc) => {
                const session_number: number = this.getRandomElement([1, 2, 3]) || 1;

                for (let i = 0; i < session_number; i++) {
                    const randomEmployee = this.getRandomElement(staff_local);

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
                        'student_id': stud_loc.user_id,
                        'employee_id': randomEmployee.staff_id, // Now it's guaranteed not to be undefined
                        'student_name': stud_loc.name,
                        'office_id':randomOffice.office_id,
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
                console.log(date)


                for (let i = -2; i < 2; i++) { // выведет 0, затем 1, затем 2
                    const finalDate = new Date(date.getTime() + i * 7 * 24 * 60 * 60 * 1000)
                    await Session_model.create({
                        startDateTime: finalDate.toISOString(),
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
                    }   );
                }
            }


            console.log(await payHandler.read_all_by_user('2'))

            // console.log('sessions = ', sessions);

            return true;

    }

    // makeSessionFromStudent = (
    //     students:UserAttributes[],
    //     staff:StaffAttributes[],
    //     offices:OfficeAttributes[]
    // ):CustomSessionAttributes[] => {
    //
    //     const sessions_:CustomSessionAttributes[] = []
    //
    //     let uniqueIndex = 0;
    //     const uniqueTimes = new Set();
    //
    //     students.forEach((item:any) => {
    //         const session_number: number = this.getRandomElement([1, 2, 3]) || 1;
    //
    //         for (let i = 0; i < session_number; i++) {
    //             const randomEmployee = this.getRandomElement(staff);
    //
    //             let randomDay;
    //             let randomHour;
    //             let timeString;
    //
    //             do {
    //                 randomDay = this.getRandomElement2([0,1,2,3,4,5,6]);
    //                 randomHour = this.getRandomElement2([9,10,11,12,13,14,15,16,17,18,18,20]);
    //
    //                 // Create a string that represents the day and hour
    //                 console.log(`${randomDay}-${randomHour}`)
    //                 timeString = `${randomDay}-${randomHour}`;
    //             } while (uniqueTimes.has(timeString));
    //
    //
    //
    //
    //             if (!randomEmployee) {
    //                 throw new Error('No employee found');
    //             }
    //             const randomOffice = this.getRandomElement(offices);
    //             if (!randomOffice) {
    //                 throw new Error('No employee found');
    //             }
    //
    //             sessions_.push({
    //                 'index': uniqueIndex,
    //                 'student_id': item.id,
    //                 'employee_id': randomEmployee.staff_id, // Now it's guaranteed not to be undefined
    //                 'student_name': item.firstName,
    //                 'office_id':randomOffice.office_id,
    //                 'day':randomDay,
    //                 'time': randomHour,
    //             });
    //             uniqueIndex++;
    //         }
    //     });
    //
    //     return sessions_
    // }
    //

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