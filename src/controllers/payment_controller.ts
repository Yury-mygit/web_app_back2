/* read me
*  Payment Controller
*/
import PaymentModel, {PayAttributes, PayCreationAttributes, PaymentStatus} from '../models/payment_model'

// type PartialUserAttributes = Pick<UserAttributes, 'user_id' | 'name' | 'surname'>;

class PaymentController{
    async getAllPays(req:any, res:any, next:any){

        const payload = req.body
        const skip = payload.skip || 0;
        const limit = payload.limit || 100;

        try {
            const students:PayAttributes[] = await PaymentModel.findAll({
                offset: skip,
                limit: limit,
                order:['pay_id'],
                attributes: ['pay_id', 'user_id', 'status']
            });
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

        const data: PayCreationAttributes = {
            user_id: req.body.user_id,
            pay_type: req.body.pay_type,
            status: PaymentStatus.NEW
        }

        try {
            const payment = await PaymentModel.create( data);
            res.json(payment.id);
        } catch (err: any) {
            res.status(500).json(err)
        }
    }

    async updatePayment(req:any, res:any, next:any){

        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            parentsName: req.body.firstName,
            age: req.body.age,
            status: 'active',
            sessionTransferRate: 0.05,
            percentageOfAbsences: 0.02,
            contactEmail: req.body.contactEmail,
            contactTelephone: req.body.contactTelephone,
            dateOfInitialDiagnosis: req.body.dateOfInitialDiagnosis,
            address: req.body.address
        }

        try {
            const studentId = req.body.id;
            await PaymentModel.update(data, { where: { id: studentId } });

            res.json({ message: 'User_model updated successfully' });
        } catch (err: any) {
            res.status(500).json(err)
        }
    }

    async deletePayment(req:any, res:any, next:any){
        try {
            const paymentId = req.params.id;
            await PaymentModel.destroy({ where: { id: paymentId } });
            res.json({ message: 'User_model deleted successfully' });
        } catch (err: any) {
            res.status(500).json(err)
        }
    }
}

export default  new PaymentController()