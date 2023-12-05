import { PayCreationAttributes, PaymentStatus } from '../../../models/payment_model';
import PaymentDataHandler  from '../../../database/handlers/PaymentDataHandler';

export default  async function updatePay(req: any, res: any, next: any) {
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
