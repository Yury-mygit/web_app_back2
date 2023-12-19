import PaymentModel, {PayCreationAttributes, PaymentStatus} from "../../payments/payment_model";
import Payment_model from "../../payments/payment_model";

const consume = async (user_id: number) =>{

    const pay = await PaymentModel.findOne({
        where: {
            user_id: user_id,
            status: PaymentStatus.ACTIVE
        }
    })
    return 1


    // if(pay) {
    //     const sessionCount = parseInt(pay..split('_')[1]);
    //
    //     if (parseInt(product?.product_type) > pay?.spend) {
    //         const payload: PayCreationAttributes = {
    //             user_id: ses.user_id,
    //             product_id: pay.product_id,
    //             status: PaymentStatus.ACTIVE,
    //             spend: pay?.spend + 1
    //         };
    //         await Payment_model.update(payload, {
    //             where:{
    //                 'pay_id':pay.pay_id
    //             }
    //         } )
    //     }
    //
    //     if (parseInt(product?.product_type) == pay?.spend) {
    //         const payload: PayCreationAttributes = {
    //             user_id: ses.user_id,
    //             product_id: pay.product_id,
    //             status: PaymentStatus.SPENT,
    //             spend: pay?.spend
    //         };
    //         await Payment_model.update(payload, {
    //             where:{
    //                 'pay_id':pay.pay_id
    //             }
    //         } )
    //     }
    //     continue
    // }
    //
    //
    // // Update the record
    // await PaymentModel.update(updateData, {
    //     where: { pay_id }
    // })
    //     .then(async data=>{
    //         const fetchedRecord = await PaymentModel.findOne({
    //             where: { pay_id: pay_id },
    //             attributes: ['pay_id', 'user_id', 'product_type', 'status']  // Specify the fields you want to include
    //         });
    //
    //         if (!fetchedRecord) {
    //             throw new Error('Record not found after creation');
    //         }
    //
    //         res.json(fetchedRecord)
    //     })
    //     .catch((err: unknown) => this.errorHandler(err, res));
}

export default consume