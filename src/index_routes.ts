import express from 'express';
import studentsRouter from './user/UserRouter';
import employeesRouter from './routers/routers/employee_router';
import sessionsRouter from './routers/routers/session_router';
import officesRouter from './routers/routers/office_router';
import productRouters from './routers/routers/product_router';
import {paymentsRouter} from './payments/payment_router';
import testRouter from './MOK/fake_router'
import product_router from "./routers/routers/product_router";

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