/* read me
*  Is responsible for interacting with the database and storing payment data
*/
import { Request, Response, NextFunction } from 'express';
import PaymentDataHandler from "../database/handlers/PaymentDataHandler";

import PaymentModel, {PayAttributes, PayCreationAttributes, PaymentStatus} from "../models/payment_model";

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
                attributes: ['pay_id', 'user_id', 'product_type', 'status']
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



    createPay = async (req: Request, res: Response, next: NextFunction) => {
        const payload: PayCreationAttributes = {
            user_id: req.body.user_id,
            product_type: req.body.product_type,
            status: PaymentStatus.NEW
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
            status: PaymentStatus.NEW
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
        const payload: PayCreationAttributes = {
            pay_id: req.body.pay_id,
            user_id: req.body.user_id,
            product_type: req.body.product_type,
            status: PaymentStatus.NEW
        };

        console.log(payload)

        try {
            const data = await PaymentDataHandler.update_record(payload)
            res.json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    updatePay_v2 = async (req: Request, res: Response, next: NextFunction) =>{
        const payload: PayCreationAttributes = {
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