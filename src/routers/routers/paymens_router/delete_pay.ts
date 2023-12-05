import {PayAttributes, PayCreationAttributes, PaymentStatus} from '../../../models/payment_model';
import PaymentDataHandler  from '../../../database/handlers/PaymentDataHandler';

const deletePay = async (req:any, res:any, next:any) => {
    try {
        const paymentId = req.params.id;
        await PaymentDataHandler.delete_by_pay_id(paymentId);
        res.json({ message: 'User_model deleted successfully' });
    } catch (err: any) {
        res.status(500).json(err)
    }
}

export default deletePay