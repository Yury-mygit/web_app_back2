import {PayAttributes, PayCreationAttributes, PaymentStatus} from '../../../models/payment_model';
import PaymentDataHandler  from '../../../database/handlers/PaymentDataHandler';

export default  async function getPays(req: any, res: any, next: any) {
    try {
        const students:Partial<PayAttributes>[] = await PaymentDataHandler.read_all();
        res.json(students);
    } catch (err) {
        console.log(err)
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}