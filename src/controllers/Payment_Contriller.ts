/* read me
*  Is responsible for interacting with the database and storing payment data
*/
import { Request, Response, NextFunction } from 'express';
import PaymentDataHandler from "../database/handlers/PaymentDataHandler";

import PaymentModel, {PayAttributes, PayCreationAttributes, PaymentStatus} from "../models/payment_model";
import User_model from "../models/user/user_model";

class Payment_Contriller {
    private dataHandler: PaymentDataHandler;


    constructor() {
        this.dataHandler = new PaymentDataHandler();
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


    getAllPays_v2 = async (req: Request, res: Response, next: NextFunction) => {

        const {user_id, ...data} = req.body

        try {
            const queryOptions: { attributes: string[], where?: { user_id?: string } } = {
                attributes: ['pay_id', 'user_id', 'product_type', 'status', 'spend']
            };

            if (user_id) {
                queryOptions.where = { user_id: user_id as string };
            }

            const pays = await PaymentModel.findAll(queryOptions);
            res.json(pays);
        } catch (err) {
            this.errorHandler(err, res);
        }
    };

    getByTelegramID = async (req: Request, res: Response, next: NextFunction) => {
        const telegramID = req.body.telegram_id;
        // console.log(telegramID); // Log to verify that telegramID is not undefined
        try {
            // Ensure that User_model has a field named 'telegram_id'
            const user = await User_model.findOne({ where: { telegram_id: telegramID } });

            if (user === null) {
                console.log('User not found!');
                res.status(404).json({ message: 'User not found' });
                return;
            }else {
                console.log("User found №" + user.user_id)
            }

            // Use the correct identifier for the user (e.g., user.id or user.telegram_id)
            const queryOptions = {
                attributes: ['pay_id', 'user_id', 'product_type', 'status', 'spend'],
                where: { user_id: user.user_id } // Replace 'user.id' with the correct user identifier if needed
            };

            const pays = await PaymentModel.findAll(queryOptions);
            res.json(pays);
        } catch (err) {
            this.errorHandler(err, res);
        }
    };

    createPay = async (req: Request, res: Response, next: NextFunction) => {
        const payload: PayCreationAttributes = {
            user_id: req.body.user_id,
            product_type: req.body.product_type,
            status: PaymentStatus.NEW,
            spend:0
        };

        try {
            const data = await PaymentDataHandler.make_record2(payload);
            res.json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    createPay_v2 = async (req: Request, res: Response, next: NextFunction) => {
        const payload: PayCreationAttributes = {
            user_id: req.body.user_id,
            product_type: req.body.product_type,
            status: PaymentStatus.NEW,
            spend:0
        };

        await PaymentModel.create(payload, { returning: true }) // This works if the DB supports it (e.g., PostgreSQL)
            .then((data) => {
                const filteredData = {
                    pay_id: data.pay_id,
                    user_id: data.user_id,
                    product_type: data.product_type,
                    status: data.status
                };
                console.log(filteredData);
                res.status(201).json(filteredData);
            })
            .catch((err: unknown) => this.errorHandler(err, res));
    }



    updatePay = async (req: Request, res: Response, next: NextFunction) =>{


        const payload: Partial<PayAttributes> = {
            pay_id: req.body.pay_id,
            user_id: req.body.user_id,
            product_type: req.body.product_type,
            status: PaymentStatus.NEW
        };

        if (!payload.pay_id) {
            res.json('error');
            return; // Stop further execution
        }

        const record = PaymentDataHandler.read_by_pay_id(payload.pay_id.toString())

        console.log(payload)

        try {
            const data = await PaymentDataHandler.update_record(payload)
            res.json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    updatePay_v2 = async (req: Request, res: Response, next: NextFunction) =>{
        const payload: Partial<PayAttributes> = {
            pay_id: req.body.pay_id,
            user_id: req.body.user_id,
            product_type: req.body.product_type,
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


    deletePayment = async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const paymentId = req.params.id;
            await PaymentDataHandler.delete_by_pay_id(paymentId);
            res.json({ message: 'User_model deleted successfully' });
        } catch (err: any) {
            res.status(500).json(err)
        }
    }
    deletePayment_v2 = async (req: Request, res: Response, next: NextFunction) => {

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