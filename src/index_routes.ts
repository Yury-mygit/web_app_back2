import express from 'express';
import studentsRouter from './subject/user/UserRouter';
import employeesRouter from './subject/staff/employee_router';
import sessionsRouter from './subject/session/session_router';
import officesRouter from './subject/office/office_router';
import productRouters from './subject/product/product_router';
import {paymentsRouter} from './subject/payments/payment_router';
import testRouter from './mok/fake_router'
import product_router from "./subject/product/product_router";

const router = express.Router();

router.use('/user', studentsRouter);
router.use('/employee', employeesRouter);
router.use('/session', sessionsRouter);
router.use('/offices', officesRouter);
router.use('/product', productRouters);
router.use('/payment', paymentsRouter);
router.use('/fake', testRouter)

// router.post('/registration')
// router.post('/login')
// router.post('/logout')
// router.get('/activate/:link')
// router.get('/refresh')
// router.get('/users')

export default router;