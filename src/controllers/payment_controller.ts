/* read me
*  Payment Controller
*/
import PaymentModel, {PayAttributes, PayCreationAttributes, PaymentStatus, ProductType} from '../models/payment_model'

// type PartialUserAttributes = Pick<UserAttributes, 'user_id' | 'name' | 'surname'>;

class PaymentController{
    constructor() {
        this.createPay = this.createPay.bind(this);
    }
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

        const payload: PayCreationAttributes = {
            user_id: req.body.user_id,
            product_type: req.body.product_type,
            status: PaymentStatus.NEW
        }

        let data

        try {
            data = await this.make_record(payload)
            res.json(data)
        } catch (err) {
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

    async make_record(data: PayCreationAttributes): Promise<Partial<PayAttributes>> {
        const createdRecord = await PaymentModel.create(data);

        // Fetch the created record with filtered fields
        const fetchedRecord = await PaymentModel.findOne({
            where: { pay_id: createdRecord.pay_id },
            attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
        });

        if (!fetchedRecord) {
            throw new Error('Record not found after creation');
        }

        return fetchedRecord;
    }
    async update_record(data: Partial<PayAttributes>): Promise<Partial<PayAttributes>> {
        // Extract pay_id from data
        const { pay_id, ...updateData } = data;

        // Update the record
        await PaymentModel.update(updateData, {
            where: { pay_id }
        });

        // Fetch the updated record with filtered fields
        const fetchedRecord = await PaymentModel.findOne({
            where: { pay_id },
            attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
        });

        if (!fetchedRecord) {
            throw new Error('Record not found after update');
        }

        return fetchedRecord;
    }
    async read_all(): Promise<Partial<PayAttributes>[]> {
        const records = await PaymentModel.findAll({
            attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
        });

        return records;
    }
    async read_all_by_user(user_id: string): Promise<Partial<PayAttributes>[]> {
        const records = await PaymentModel.findAll({
            where: { user_id },
            attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
        });

        return records;
    }
    async read_by_pay_id(pay_id: string): Promise<Partial<PayAttributes>> {
        const record = await PaymentModel.findOne({
            where: { pay_id },
            attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
        });

        if (!record) {
            throw new Error('Record not found');
        }

        return record;
    }
    async delete_by_pay_id(pay_id: string): Promise<void> {
        await PaymentModel.destroy({
            where: { pay_id }
        });
    }
}

export default  new PaymentController()