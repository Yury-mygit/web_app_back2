import express from 'express';
import studentsRouter from './core/routers/UserRouter';
import employeesRouter from './core/routers/employee_router';
import sessionsRouter from './core/routers/session_router';
import officesRouter from './core/routers/office_router';
import productRouters from './core/routers/product_router';
import {paymentsRouter} from './core/routers/payment_router';
import testRouter from './mok/fake_router'
import product_router from "./core/routers/product_router";

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