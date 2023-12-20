import { Response } from 'express';
import PaymentModel, {  PayCreationAttributes ,PaymentStatus} from '../payment_model'; // Adjust the import path as necessary
// import { PaymentStatus } from '../models/payment_status_enum'; // Adjust the import path as necessary

// Curried function
const save =  async (user_id: number, product_id: number, status: PaymentStatus) => {
    const payload: PayCreationAttributes = {
        user_id: user_id,
        product_id: product_id,
        status: status,
        spend: 1
    };

    const data = await PaymentModel.create(payload, { returning: true });
    const filteredData = {
        pay_id: data.pay_id,
        user_id: data.user_id,
        product_id: data.product_id,
        status: data.status
    };
    // res.status(201).json(filteredData);
    return filteredData
};

export default save;
