/* read me
*  Is responsible for interacting with the database and storing payment data
*/

import SessionModel from '../../entities/session/session_model'
import SessionAttributes,{PartialSessionAttributes} from "../../interface/session_interfases";

class SessionDataHandler {

    static async  make_record (data: PartialSessionAttributes): Promise<Partial<SessionAttributes>> {
        const createdRecord = await SessionModel.create(data);

        // Fetch the created record with filtered fields
        const fetchedRecord = await SessionModel.findOne({
            where: { session_id: createdRecord.session_id },
            attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
        });

        if (!fetchedRecord) {
            throw new Error('Record not found after creation');
        }

        return fetchedRecord;
    }






    static async update_record(data: Partial<SessionAttributes>): Promise<Partial<SessionAttributes>> {
        // Extract pay_id from data
        const { session_id, ...updateData } = data;

        // Update the record
        await SessionModel.update(updateData, {
            where: { session_id }
        });

        // Fetch the updated record with filtered fields
        const fetchedRecord = await SessionModel.findOne({
            where: { session_id },
            attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
        });

        if (!fetchedRecord) {
            throw new Error('Record not found after update');
        }

        return fetchedRecord;
    }



    static async read_all(): Promise<Partial<SessionAttributes>[]> {

        const records = await SessionModel.findAll({
            attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
        });

        return records;
    }

    static async read_all_by_user(user_id: string): Promise<Partial<SessionAttributes>[]> {
        const records = await SessionModel.findAll({
            where: { user_id },
            attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
        });

        return records;
    }

    static async read_by_session_id(pay_id: string): Promise<Partial<SessionAttributes>> {
        const record: Partial<SessionAttributes | null> = await SessionModel.findOne({
            where: { pay_id },
            attributes: ['session_id', 'session_id', 'startDateTime', 'performed']  // Specify the fields you want to include
        });

        if (!record) {
            throw new Error('Record not found');
        }

        return record;
    }

    static async delete_by_pay_id(pay_id: string): Promise<void> {
        await SessionModel.destroy({
            where: { pay_id }
        });
    }
}


export default SessionDataHandler
