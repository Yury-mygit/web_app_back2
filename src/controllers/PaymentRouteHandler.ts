/* read me
*  Is responsible for interacting with the database and storing payment data
*/
import { Request, Response, NextFunction } from 'express';
import {PayAttributes, PayCreationAttributes, PaymentStatus, ProductType} from '../models/payment_model'
import PaymentDataHandler from "../database/handlers/PaymentDataHandler";
import createPay from '../routers/routers/paymens_router/create_pay'
import updatePay from "../routers/routers/paymens_router/update_pay";
import getPays from "../routers/routers/paymens_router/get_pays";
import deletePay from "../routers/routers/paymens_router/delete_pay";

class PaymentRouteHandler {
    private dataHandler: PaymentDataHandler;


    constructor() {
        this.dataHandler = new PaymentDataHandler();
        this.createPay = this.createPay.bind(this);
    }


    getAllPays = async (req:Request, res:Response, next:NextFunction) =>  getPays(req, res, next)
    createPay = async (req: Request, res: Response, next: NextFunction) => createPay(req, res, next);
    updatePay = async (req: Request, res: Response, next: NextFunction) => updatePay(req, res, next)
    deletePayment = async (req:Request, res:Response, next:NextFunction) => deletePay(req, res, next)
}

export default new PaymentRouteHandler()