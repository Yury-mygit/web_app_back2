import express from 'express';
import studentsRouter from '../user/user_router';
import employeesRouter from './routers/employee_router';
import sessionsRouter from './routers/session_router';
import officesRouter from './routers/office_router';
import productRouters from './routers/product_router';
import {paymentsRouter} from '../payments/payment_router';
import testRouter from './routers/fake_router'
import product_router from "./routers/product_router";

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