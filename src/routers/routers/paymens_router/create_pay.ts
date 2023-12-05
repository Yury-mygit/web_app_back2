import { PayCreationAttributes, PaymentStatus } from '../../../models/payment_model';
import PaymentDataHandler  from '../../../database/handlers/PaymentDataHandler';

export default  async function createPay(req: any, res: any, next: any) {
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
