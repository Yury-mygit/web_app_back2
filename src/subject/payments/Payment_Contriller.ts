/* read me
*  Is responsible for interacting with the database and storing payment data
*/

import { Request, Response, NextFunction } from 'express';
import PaymentDataHandler from "../../database/handlers/PaymentDataHandler";

import PaymentModel, {PayAttributes, PayCreationAttributes, PaymentStatus} from "../../core/models/payment_model";
import User_model from "../../core/models/user_model";
import ProductModel from "../../core/models/product_model";
import {da} from "@faker-js/faker";
import {Op} from "sequelize";
import save from "./payments/save";
import req_validate_and_configure_input_data from "./payments/validate_input_data";
import validate_input_data from "./payments/validate_input_data";
import {consumers} from "stream";
import consume from "./payments/consume";

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


    };

    getByTelegramID = async (req: Request, res: Response, next: NextFunction) => {

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

    updatePay = async (req: Request, res: Response, next: NextFunction) =>{

    }


    deletePayment = async (req: Request, res: Response, next: NextFunction) => {


    };
}



export default new Payment_Contriller()