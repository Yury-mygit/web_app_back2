/*
Controller that fill db with fake data. Pay attention! Db will drop and fill with new fake data
*/
import {Model, Op} from 'sequelize'; // Make sure to import Model from sequelize
import User_model from "../core/models/user_model";
import UserAttributes, {UserStatus} from "../core/interfas/userAtributes"
import SessionAttributes, {PartialSessionAttributes} from "../core/interfas/session_interfases";

import Session_model, {ServiceType, Status} from "../core/models/session_model";
import Office_model, {OfficeAttributes} from "../core/models/office_model";
import Employee_model, {StaffAttributes} from "../core/models/employee_model";
import Payment_model from "../core/models/payment_model";
import payment_model, {PayCreationAttributes, PaymentStatus} from "../core/models/payment_model";

import {faker} from "@faker-js/faker";

import PayHandler from '../database/handlers/PaymentDataHandler'
import {NextFunction, Request, Response} from "express";
import Product_model, {ProductAttributes, ProductType} from "../core/models/product_model";



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




export interface IRequestStrategy {
    setRequestStrategy(requestStrategy:IRequestStrategy): void,
}
export interface IExecutor {
    makeUser(resultTarget:string, response:string, ids:string): void;
    connectWorkspace(ws:any):void
    makeres( resultTarget:string, response:string, ): void
}

export interface IService {
    getUserIdList(userCount: number, flag:string):number[],
    connectWorkspace(ws:any):void
}

export interface IWorkspace {
    setData(key: string, data: any):void;
    getData(key: string):any;
    getAllKeys():string[];
    setMultipleData(keyValuePairs: Record<string, any>): void;
}



class FakeDataController {
    private dateOfInitialDiagnosis: Date;
    private t_ids = [733685428, 565047052];


    private executor: IExecutor
    private service: IService
    private workspace: IWorkspace

    constructor(executor: IExecutor, service: IService, workspace: IWorkspace) {
        this.dateOfInitialDiagnosis = new Date()
        this.dateOfInitialDiagnosis.setDate(this.dateOfInitialDiagnosis.getDate() - 13);
        this.executor = executor
        this.service = service
        this.workspace = workspace

        this.service.connectWorkspace(this.workspace)
        this.executor.connectWorkspace(this.workspace)
    }


    check = async (req: Request, res: Response, next: NextFunction) => {
        try {

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

    fill_payments_by_fake_data = async (req: Request, res: Response, next: NextFunction) => {

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

        if ( !session ) throw new Error("There is no session")

        // console.log("================START===========================")
        for (const ses of session) {
            try{
                const  pay = await Payment_model.findOne({ where: {
                        user_id: ses.user_id,
                        status: PaymentStatus.ACTIVE
                    }})

                if (!pay) throw new Error("Error there is no payment")

                const product = await Product_model.findOne({where:{
                        product_id: pay.product_id
                    }})

                if (!product) throw new Error( "Error there is no product")

                if(pay) {
                    // console.log('Payment is found! id=', pay.pay_id, 'for user' ,ses.user_id,'spended', pay.spend)
                    // console.log(product)
                    if (parseInt(product?.product_type) > pay?.spend) {
                        const payload: PayCreationAttributes = {
                            user_id: ses.user_id,
                            product_id: pay.product_id,
                            status: PaymentStatus.ACTIVE,
                            spend: pay?.spend + 1
                        };
                        await Payment_model.update(payload, {
                            where:{
                                'pay_id':pay.pay_id
                            }
                        } )
                    }

                    if (parseInt(product?.product_type) == pay?.spend) {
                        const payload: PayCreationAttributes = {
                            user_id: ses.user_id,
                            product_id: pay.product_id,
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
                console.log('Error', err)
            }







            console.log(`There is no active payments for user ${ses.user_id}, making new one`)

            const products = await Product_model.findAll({
                where: {
                    product_type: ProductType.subscription // Assuming ProductType.subscription is a valid enum or value
                },
                attributes: ['product_id', 'product_type', 'name', 'desc']
            });

            if (!products || products.length === 0) throw new Error("There are no Products");

            const randomIndex = Math.floor(Math.random() * products.length);
            const new_product = products[randomIndex];

// Assuming 'name' is a string that contains numbers and you want to extract the first number
            const str = new_product.name;
            const number = parseInt(str.match(/\d+/)?.[0] || '', 10);

            let payload: PayCreationAttributes

            if (number == 1) {
                payload = {
                    user_id: ses.user_id,
                    product_id: new_product.product_id,
                    status: PaymentStatus.SPENT,
                    spend:1
                };
            }else{
                payload = {
                    user_id: ses.user_id,
                    product_id: new_product.product_id,
                    status: PaymentStatus.ACTIVE,
                    spend:1
                };
            }

            await Payment_model.create(payload ) // This works if the DB supports it (e.g., PostgreSQL)




        }


        res.json({"Status":"ok"} )
    }

    fill_data = async (req: Request, res: Response, next: NextFunction) => {
        this.dropData(req).then(()=>
            Promise.all([
                // this.userFill(5),
                this.employeefill(3),
                this.officeFill(2),
                this.productFill()
            ]))
            .then(()=>this.sessionFill())
            // .then(()=>this.createPayments())
            .then(() => {
                res.status(200).json({ status: 'ok', desk: 'All good!!!' });
            })
            .catch((err) => {
                res.status(500).json({ status: 'error', desk: err.message || 'An unknown error occurred' })
            });
    }


    private dropData = async (req:any) => {

        try {
            await User_model.sync({force: true})
            await Employee_model.sync({force: true})
            await Office_model.sync({force:true})
            await Session_model.sync({force:true})
            await Payment_model.sync({force:true})
            await Product_model.sync({force:true})
            return true
        } catch (err) {
            return err || undefined
        }
    }


       /*  description
           1. Save data to workspace
           2. ask service.getUserIdList to makr a list
           3. ask executor.saveUser to save user to db
           4. If still no error ask respondent to make a response
       */
     userFill = async ( req: Request, res: Response, next: NextFunction) => {

        this.workspace.setMultipleData({"res":res, "number": req.body.number, "ids":this.t_ids, 'result':{}})

        this.service.getUserIdList(req.body.number, "ids")
        this.executor.makeUser('result',"res","ids")
        this.executor.makeres('result',"res",)

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

    prods = [
        {name:'subscription_1', desk:'Разовое занятие', cost: 1100},
        {name:'subscription_4', desk:'Абонемент на 4 занятия',  cost: 4100},
        {name:'subscription_8', desk:'Абонемент на 8 занятия',  cost: 7600},
        {name:'test_1', desk:'Абонемент на 8 занятия', cost: 10},
        {name:'test_2', desk:'Абонемент на 8 занятия', cost: 15},
        {name:'test_3', desk:'Абонемент на 8 занятия', cost: 20},
    ]

    private productFill = async (products: { name: string; desk: string }[] = this.prods) => {
        try {
            for (let product of products) { // Changed "in" to "of" to iterate over values
                await Product_model.create({
                    product_type: ProductType.subscription,
                    name: product.name,
                    desc: product.desk, // Changed "desk" to "description"
                    cost: 1000,
                });
            }
            return true;
        } catch (err) {
            throw err;
        }
    }

    private async createSessions(users_local: Partial<UserAttributes>[], staff_local: StaffAttributes[], offices_local: OfficeAttributes[]): Promise<void> {
        const sessions: CustomSessionAttributes[] = [];
        let uniqueIndex = 0;
        const uniqueTimes = new Set();

        users_local.forEach((stud_loc:Partial<UserAttributes>) => {
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

export default FakeDataController


