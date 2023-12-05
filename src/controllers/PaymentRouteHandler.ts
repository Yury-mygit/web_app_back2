/* read me
*  Is responsible for interacting with the database and storing payment data
*/
import {PayAttributes, PayCreationAttributes, PaymentStatus, ProductType} from '../models/payment_model'
import PaymentDataHandler from "../database/handlers/PaymentDataHandler";

class PaymentRouteHandler {
    private dataHandler: PaymentDataHandler;

    constructor() {
        this.dataHandler = new PaymentDataHandler();
        this.createPay = this.createPay.bind(this);
    }

    async getAllPays(req:any, res:any, next:any){
        try {
            const students:Partial<PayAttributes>[] = await this.dataHandler.read_all();
            res.json(students);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async createPay(req:any, res:any, next:any){
        const payload: PayCreationAttributes = {
            user_id: req.body.user_id,
            product_type: req.body.product_type,
            status: PaymentStatus.NEW
        }

        try {
            const data = await this.dataHandler.make_record(payload)
            res.json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async updatePayment(req:any, res:any, next:any){
        const data: Partial<PayAttributes> = {
            pay_id: req.body.id,
            user_id: req.body.user_id,
            product_type: req.body.product_type,
            status: PaymentStatus.NEW
        }

        try {
            const updatedData = await this.dataHandler.update_record(data);
            res.json({ message: 'User_model updated successfully', data: updatedData });
        } catch (err: any) {
            res.status(500).json(err)
        }
    }

    async deletePayment(req:any, res:any, next:any){
        try {
            const paymentId = req.params.id;
            await this.dataHandler.delete_by_pay_id(paymentId);
            res.json({ message: 'User_model deleted successfully' });
        } catch (err: any) {
            res.status(500).json(err)
        }
    }
}

export default new PaymentRouteHandler()