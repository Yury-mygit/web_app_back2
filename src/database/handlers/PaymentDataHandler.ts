/* read me
*  Is responsible for interacting with the database and storing payment data
*/

import PaymentModel, {PayAttributes, PayCreationAttributes} from "../../models/payment_model";


class PaymentDataHandler {
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

    static async  make_record2 (data: PayCreationAttributes): Promise<Partial<PayAttributes>> {
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


    static async update_record(data: Partial<PayAttributes>): Promise<Partial<PayAttributes>> {
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







    static async read_all(): Promise<Partial<PayAttributes>[]> {

        console.log("dalls")


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
    static async delete_by_pay_id(pay_id: string): Promise<void> {
        await PaymentModel.destroy({
            where: { pay_id }
        });
    }
}


export default PaymentDataHandler
