/* read me
*  Payment Controller
*/
import PaymentModel  from '../models/payment_model'
import {  validationResult, checkSchema,  check, oneOf ,  body, query } from 'express-validator';
import {ServiceType, Status} from "../models/session_model";

class PaymentController{
    async getAllPays(req:any, res:any, next:any){

        // return res.status(400).json({ errors: 'sdsadd' });
        //
        // Define validation rules
        console.log(req.body)
        // const validationRules = [
        //     body('user_id').isNumeric().toInt().optional(),
        //     query('user_id').isNumeric().toInt().optional(),
        //     body('skip').isNumeric().toInt().optional(),
        //     query('skip').isNumeric().toInt().optional(),
        //     body('limit').isNumeric().toInt().optional(),
        //     query('limit').isNumeric().toInt().optional()
        // ];
        //
        // // Validate the request
        // await Promise.all(validationRules.map(rule => rule.run(req)));

        // Check for validation errors
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const payload = req.body

        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 100;

            const students = await PaymentModel.findAll({
                offset: skip,
                limit: limit,
                order:['pay_id']
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

    async AcceptPayment(req:any, res:any, next:any){

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
            const studentData = req.body;
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