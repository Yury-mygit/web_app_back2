/* read me
*  Is responsible for interacting with the database and storing payment data
*/

import { Request, Response, NextFunction } from 'express';
import PaymentDataHandler from "../../../database/handlers/PaymentDataHandler";

import PaymentModel, {PayAttributes, PayCreationAttributes, PaymentStatus} from "../payment_model";
import User_model from "../../user/user_model";
import ProductModel from "../../product/product_model";
import {da} from "@faker-js/faker";
import {Op} from "sequelize";
import save from "./save";
import req_validate_and_configure_input_data from "./validate_input_data";
import validate_input_data from "./validate_input_data";
import {consumers} from "stream";
import consume from "./consume";

// type UserInput = {
//     user_id: number;
//
// };
//
// type RequestInput = {
//     req: Request;
//     res: Response;
//     next: NextFunction;
// };

interface ConsumePaymentInput {
    req: Request;
    res: Response;
    next: NextFunction;
}
class Payment_Contriller {
    // private dataHandler: PaymentDataHandler;


    constructor() {
        // this.dataHandler = new PaymentDataHandler();
        // this.createPay = this.createPay.bind(this);
    }

    errorHandler = (err: unknown, res: Response) =>{
        console.log(err);
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }


    getAllPays = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Asked pays with data", req.body)

        const {user_id, telegram_id, ...data} = req.body

        try {
            const queryOptions: {
                attributes: string[],
                where?: { user_id?: number },
                include: { model: typeof ProductModel, attributes: string[] }[]
            } = {
                attributes: ['pay_id', 'user_id', 'product_id', 'status', 'spend','createdAt'],
                include: [{
                    model: ProductModel,
                    attributes: ['name', 'desc'] // Include only the desired product attributes
                }]
            };

            if (user_id) {
                queryOptions.where = { user_id: user_id };
            } else if(telegram_id){
                const user = await User_model.findOne({
                    attributes: ['user_id'],
                    where:{
                        telegram_id: telegram_id
                    }
                })

                if (!user) {
                    throw `User with telegram id ${telegram_id} not found`
                }

                if(user) {
                    queryOptions.where = { user_id: user.user_id };
                }
            }

            // Find all payments associated with the user
            const pays = await PaymentModel.findAll(queryOptions);

            if (!pays || pays.length===0) {
                console.log('User not found!');
                res.status(404).json({ message: 'User not found' });
                return;
            } else {
                // console.log(`Payments for user № ${user.user_id} - ${user.name} founds`);
            }

            const result = pays.map(pay => ({
                pay_id: pay.pay_id,
                user_id: pay.user_id,
                user_name: user_id,
                product_name: pay.product?.name, // Assuming 'name' is a property of ProductModel
                product_desc: pay.product?.desc,
                status: pay.status,
                spend: pay.spend
            }));
            res.json(result);
        } catch (err) {
            this.errorHandler(err, res);
        }
    };

    getByTelegramID = async (req: Request, res: Response, next: NextFunction) => {
        const telegramID = req.body.telegram_id;

        try {
            // Find the user by Telegram ID
            const user = await User_model.findOne({ where: { telegram_id: telegramID } });

            if (!user) {
                console.log('User not found!');
                res.status(404).json({ message: 'User not found' });
                return;
            } else {
                console.log("User found №" + user.user_id);
            }
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

            // Query options to find payments associated with the user
            const queryOptions = {
                attributes: ['pay_id', 'user_id', 'product_id', 'status', 'spend', 'createdAt'],
                where: {
                    user_id: user.user_id,
                    createdAt: {
                        [Op.gte]: threeMonthsAgo // Greater than or equal to 3 months ago
                    }
                },
                include: [{
                    model: ProductModel,
                    attributes: ['name', 'desc']
                }]
            };

            // Find all payments associated with the user
            const pays = await PaymentModel.findAll(queryOptions);

            if (!pays || pays.length===0) {
                console.log('User not found!');
                res.status(404).json({ message: 'User not found' });
                return;
            } else {
                console.log(`Payments for user № ${user.user_id} - ${user.name} founds`);
            }

            // Map the payments to include only the necessary information
            const result = pays.map(pay => ({
                pay_id: pay.pay_id,
                user_id: pay.user_id,
                user_name: user.name,
                product_name: pay.product?.name, // Assuming 'name' is a property of ProductModel
                product_desc: pay.product?.desc,
                status: pay.status,
                spend: pay.spend,
                created: pay.createdAt
            }));

            // Send the result as a JSON response
            res.json(result);
        } catch (err) {
            this.errorHandler(err, res);
        }
    };



    // Overload signatures
    createPay(user_id: number, product_id: number): Promise<{ status: string; data: any }>;
    createPay(req: Request, res: Response, next: NextFunction): Promise<void>;


    // Implementation that works for both signatures
    async createPay(...args: any[]): Promise<any> {

        if (args.length === 2) {
            // Handle the case where user_id and product_id are provided
            const [user_id, product_id] = args;
            try {
                const result = await save(user_id, product_id, PaymentStatus.ACTIVE);
                return { status: "ok", data: result };
            } catch (e) {
                if (e instanceof Error) {
                    return { status: 'error', data: e.message };
                } else {
                    return { status: 'error', data: 'An unexpected error occurred' };
                }
            }
        } else if (args.length === 3) {
            // Handle the case where req, res, and next are provided
            const [req, res, next] = args;
            let { user_id, telegram_id, product_id } = req.body as {
                user_id?: number;
                telegram_id?: number;
                product_id: number;
            };

            try {
                const validated_data = await req_validate_and_configure_input_data(user_id, telegram_id, product_id);
                const result = await save(validated_data.user_id, validated_data.product_id, PaymentStatus.ACTIVE);
                res.status(201).json(result);
            } catch (e) {
                if (e instanceof Error) {
                    res.status(400).json({ error: e.message });
                } else {
                    res.status(500).json({ error: 'An unexpected error occurred' });
                }
            }
        }
    }




    // type UserInput = {
    //     user_id: number;
    //
    // };
    //
    // type RequestInput = {
    //     req: Request;
    //     res: Response;
    //     next: NextFunction;
    // };

    test = async () => {
        this.consumePayment({user_id:1})
    }


    async consumePayment(input: { user_id: number } |  ConsumePaymentInput): Promise<any> {
        // console.clear()
        console.log("consumePayment  input");
        console.log(input.hasOwnProperty('req'))
        if ('res' in input) {
            const { req, res, next } = input;
            let { user_id } = req.body as { user_id?: number; };
            if (!user_id) { throw new Error("User id is required"); }
            const response = await consume(user_id);
            res.json(response);
        } else {

            const { user_id } = input;
            console.log('else branch', user_id);
            // ... rest of the logic for handling direct user input
            return 1
        }
    }

    // async consumePayment(req: Request, res: Response, next: NextFunction): Promise<any> {
    //     // console.clear()
    //     console.log("consumePayment  input",req);
    //
    // }



    updatePay = async (req: Request, res: Response, next: NextFunction) =>{
        const payload: Partial<PayAttributes> = {
            pay_id: req.body.pay_id,
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            status: PaymentStatus.NEW
        };

        const { pay_id, ...updateData } = payload;

        // Update the record
        await PaymentModel.update(updateData, {
            where: { pay_id }
        })
            .then(async data=>{
                const fetchedRecord = await PaymentModel.findOne({
                    where: { pay_id: pay_id },
                    attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
                });

                if (!fetchedRecord) {
                    throw new Error('Record not found after creation');
                }

                res.json(fetchedRecord)
            })
            .catch((err: unknown) => this.errorHandler(err, res));
    }


    deletePayment = async (req: Request, res: Response, next: NextFunction) => {

        const { pay_id, ...payData } = req.body;

        try {
            const isDone : number = await PaymentModel.destroy({ where: { pay_id: pay_id } });

            if (!isDone) {
                throw new Error('Payment not found');
            }

            res.json({ message: 'Payment deleted successfully', 'deleted': {pay_id, ...payData} });
        } catch (err) {
            this.errorHandler(err, res);
        }
    };
}



export default new Payment_Contriller()