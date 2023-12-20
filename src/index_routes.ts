import express from 'express';
import studentsRouter from './entities/user/UserRouter';
import employeesRouter from './entities/staff/employee_router';
import sessionsRouter from './entities/session/session_router';
import officesRouter from './entities/office/office_router';
import productRouters from './entities/product/product_router';
import {paymentsRouter} from './entities/payments/payment_router';
import testRouter from './entities/mok/fake_router'
import product_router from "./entities/product/product_router";

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