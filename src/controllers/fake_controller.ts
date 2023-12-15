/*
Controller that fill db with fake data. Pay attention! Db will drop and fill with new fake data
*/
import {Model, Op} from 'sequelize'; // Make sure to import Model from sequelize
import User_model from "../models/user/user_model";
import UserAttributes, {UserCreationAttributes, UserStatus} from "../interface/user_interface"
import SessionAttributes from "../interface/session_interfases";

import Session_model, {ServiceType, Status} from "../models/session_model";
import Office_model, {OfficeAttributes} from "../models/office_model";
import Employee_model, {StaffAttributes} from "../models/employee_model";
import Payment_model from "../models/payment_model";
import payment_model, {PayCreationAttributes, PaymentStatus, ProductType} from "../models/payment_model";

import {faker} from "@faker-js/faker";

import PayHandler from '../database/handlers/PaymentDataHandler'
import {NextFunction, Request, Response} from "express";

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

    // Routers Handlers ================================
    check = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);

            const productType = req.body.product_type as ProductType;

            // Check if the product type from the request body is a valid enum value
            if (!Object.values(ProductType).includes(productType)) {
                throw new Error('Invalid product type');
            }

            // If the check passes, assign the value to 'a'
            let a: ProductType = productType;


            const enumValues = Object.values(ProductType).filter(v => typeof v === 'string') as string[];
            console.debug('debag:  ',enumValues)
            // Generate a random index based on the number of enum values
            const randomIndex = Math.floor(Math.random() * enumValues.length);

            // Select a random value from the enum
            const randomEnumValue = enumValues[randomIndex] as ProductType;

            // Assign the random enum value to 'a'
            let b: ProductType = randomEnumValue;




            res.json({ productType: a, b });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }

        return true;
    };

    payments = async (req: Request, res: Response, next: NextFunction) => {

        try {
            await payment_model.sync({force: true})
        } catch (err) {
            return err || undefined
        }

        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        let startDate =  twoWeeksAgo;
        let endDate =  new Date();

        let session: SessionAttributes[] = await this.genericDataLoader(Session_model, {
            where: {
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                },
            }
        });

        /*
        *
        * 1. Run throw session
        * take one session and check which user on it
        * check payments if there a paymens in New status
        *   if exist, we check
        *
        *
        *
        *
        * */
        console.log("================START===========================")
        for (const ses of session) {
            console.log(" ")


            // NEW ===
            try{
                const  pay = await Payment_model.findOne({ where: {
                        user_id: ses.user_id,
                        status: PaymentStatus.NEW
                       }})
                if (pay != undefined){
                    // console.log(pay.product_type, '  ', pay.spend)
                }
                // console.log('in new',pay?.product_type)
            }catch (err){

            }


            // ACTIVE ============
            try{
                const  pay = await Payment_model.findOne({ where: {
                        user_id: ses.user_id,
                        status: PaymentStatus.ACTIVE
                    }})
                if(pay) {
                    console.log('Payment is found! id=', pay.pay_id, 'for user' ,ses.user_id,'spended', pay.spend)
                    if (parseInt(pay?.product_type) > pay?.spend) {
                        const payload: PayCreationAttributes = {
                            user_id: ses.user_id,
                            product_type: pay.product_type,
                            status: PaymentStatus.ACTIVE,
                            spend: pay?.spend + 1
                        };
                        await Payment_model.update(payload, {
                            where:{
                                'pay_id':pay.pay_id
                            }
                        } )
                    }

                    if (parseInt(pay?.product_type) == pay?.spend) {
                        const payload: PayCreationAttributes = {
                            user_id: ses.user_id,
                            product_type: pay.product_type,
                            status: PaymentStatus.SPENT,
                            spend: pay?.spend
                        };
                        await Payment_model.update(payload, {
                            where:{
                                'pay_id':pay.pay_id
                            }
                        } )
                    }
                    continue
                }

            }catch (err){

            }



            console.log(`There is no active payments for user ${ses.user_id}, making new one`)

            const enumValues = Object.values(ProductType).filter(v => typeof v === 'string') as string[];

            // Generate a random index based on the number of enum values
            const randomIndex = Math.floor(Math.random() * enumValues.length);

            // Select a random value from the enum
            const randomEnumValue = enumValues[randomIndex] as ProductType;

            let payload: PayCreationAttributes

            console.log('aasSS',randomEnumValue, 'ASA', randomEnumValue == "1")
            if (randomEnumValue == "1") {
                payload = {
                    user_id: ses.user_id,
                    product_type: randomEnumValue,
                    status: PaymentStatus.SPENT,
                    spend:1
                };
            }else{
                payload = {
                    user_id: ses.user_id,
                    product_type: randomEnumValue,
                    status: PaymentStatus.ACTIVE,
                    spend:1
                };
            }




            await Payment_model.create(payload ) // This works if the DB supports it (e.g., PostgreSQL)




        }

        console.log("================END===========================")
        //======================================






        res.json({"Status":"ok"} )
    }

    fill_data = async (req: Request, res: Response, next: NextFunction) => {
        this.dropdata(req).then(()=>
            Promise.all([
                this.studentfill(5),
                this.employeefill(3),
                this.officeFill(2)
            ]))
            .then(()=>this.sessionFill())
            .then(()=>this.createPayments())
            .then(() => {
                res.status(200).json({ status: 'ok', desk: 'All good!!!' });
            })
            .catch((err) => {
                res.status(500).json({ status: 'error', desk: err.message || 'An unknown error occurred' })
            });
    }

    //Handlers =============================================================
    private dropdata = async (req:any) => {

        this.property1 = req.body.property1;
        this.property2 = req.body.property2;

        try {
            await User_model.sync({force: true})
            await Employee_model.sync({force: true})
            await Office_model.sync({force:true})
            await Session_model.sync({force:true})
            await Payment_model.sync({force:true})
            return true
        } catch (err) {
            return err || undefined
        }
    }
    private studentfill = async ( number: number) => {

        const t_ids = [733685428, 565047052, 565047052001, 565047052002, 565047052003, 565047052004, 565047052005]

        try {
            for(let i = 0; i < number; i++) {
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
                    telegram_id: t_ids[i],
                    issue:'Постановка звука Р',
                    initial_diagnosis_date: this.dateOfInitialDiagnosis.toISOString(),
                    address: faker.location.streetAddress()
                }
                await User_model.create(data);
            }
            return true;
        } catch (err) {
            return err || undefined
        }
    }

    private employeefill = async ( number: number) => {
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

    private officeFill = async (number: number) => {
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

    private async createSessions(users_local: Partial<UserAttributes>[], staff_local: StaffAttributes[], offices_local: OfficeAttributes[]): Promise<void> {
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
                    // console.log(`${randomDay}-${randomHour}`)
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
                    'user_id': stud_loc.user_id,
                    'staff_id': randomEmployee.staff_id, // Now it's guaranteed not to be undefined
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
            // console.log(date)


            for (let i = -2; i < 2; i++) { // выведет 0, затем 1, затем 2
                const finalDate = new Date(date.getTime() + i * 7 * 24 * 60 * 60 * 1000)
                await Session_model.create({
                    startDateTime: finalDate.toISOString(),
                    duration: 40,
                    week_first_day: '<placeholder>',
                    online: true,
                    paid: true,
                    confirmed: true,
                    user_id: session.user_id,
                    staff_id: session.staff_id,
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
    }
    private async createPayments(startDate?: Date, endDate?: Date): Promise<void> {


        // const twoWeeksAgo = new Date();
        // twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        //
        // startDate = startDate || twoWeeksAgo;
        // endDate = endDate || new Date();
        //
        // let session: SessionAttributes[] = await this.genericDataLoader(Session_model, {
        //     where: {
        //         createdAt: {
        //             [Op.gte]: startDate,
        //             [Op.lte]: endDate
        //         },
        //     }
        // });
        //
        // let users:Set<number> = new Set();
        //
        // session.forEach(ses =>{
        //     if (users.has(ses.user_id)) {}
        //     else users.add(ses.user_id)
        // })
        //
        // for (const user of users) {
        //     // console.log(item);
        //     let count = session.filter(item=>item.user_id==user).length
        //
        //     // Make a new payment,
        // }


    }


    //Utils =========================================================================================
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

    private genericDataLoader = async <T>(model: { findAll(opts?: object): Promise<Model[]>; name?: string }, options?: object): Promise<T[]> => {
        try {
            const records = await model.findAll(options || {});

            if (!records || records.length === 0) {
                throw new Error(`${model.name || 'Unknown model'} records are undefined or empty`);
            }

            // Convert Sequelize model instances to plain objects
            return records.map(record => record.get({ plain: true })) as T[];
        } catch (err) {
            return this.handleError(err, `Error during loading ${model.name || 'unknown'}`);
        }
    };

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



        try {
            users_local = await this.genericDataLoader(User_model, {
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate
                    },
                }
            });
            staff_local = await this.genericDataLoader(Employee_model);
            offices_local = await this.genericDataLoader(Office_model);

            // Call the new method to create sessions
            await this.createSessions(users_local, staff_local, offices_local);
        } catch (err) {
            this.handleError(err, 'Error during session fill');
        }


        return true;

    }

    private handleError(err: unknown, message: string): never {
        // console.error(message);
        if (err instanceof Error) {
            console.error(err.message);
            throw err; // Rethrow the error to maintain the stack trace
        } else {
            throw new Error('An unexpected error occurred');
        }
    }

    private getRandomElement = <T>(array: T[]): T | undefined =>{
        if (array.length === 0) {
            return undefined;
        }

        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    private getRandomElement2 = <T>(array: T[]): T  =>{
        // if (array.length === 0) {
        //     return 0;
        // }

        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }


}

export default new FakeData_Controller()



////
// sessionmaker = async (users_local) => {
//
//     const sessions: CustomSessionAttributes[] = [];
//     let uniqueIndex = 0;
//     const uniqueTimes = new Set();
//
//     users_local.forEach((stud_loc) => {
//         const session_number: number = this.getRandomElement([1, 2, 3]) || 1;
//
//         for (let i = 0; i < session_number; i++) {
//             const randomEmployee = this.getRandomElement(staff_local);
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
//                 // console.log(`${randomDay}-${randomHour}`)
//                 timeString = `${randomDay}-${randomHour}`;
//             } while (uniqueTimes.has(timeString));
//
//
//
//
//             if (!randomEmployee) {
//                 throw new Error('No employee found');
//             }
//             const randomOffice = this.getRandomElement(offices_local);
//             if (!randomOffice) {
//                 throw new Error('No employee found');
//             }
//
//             sessions.push({
//                 'index': uniqueIndex,
//                 'student_id': stud_loc.user_id,
//                 'employee_id': randomEmployee.staff_id, // Now it's guaranteed not to be undefined
//                 'student_name': stud_loc.name,
//                 'office_id':randomOffice.office_id,
//                 'day':randomDay,
//                 'time': randomHour,
//             });
//             uniqueIndex++;
//         }
//     });
//
//
// }