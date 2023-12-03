import express from 'express';
import studentsRouter from './routers/student_router';
import employeesRouter from './routers/employee_router';
import sessionsRouter from './routers/session_router';
import officesRouter from './routers/office_router';
import {paymentsRouter} from './routers/payment_router';
import testRouter from './routers/fake_router'

const router = express.Router();

router.use('/user', studentsRouter);
router.use('/employee', employeesRouter);
router.use('/session', sessionsRouter);
router.use('/offices', officesRouter);
router.use('/payment', paymentsRouter);
router.use('/fake', testRouter)

// router.post('/registration')
// router.post('/login')
// router.post('/logout')
// router.get('/activate/:link')
// router.get('/refresh')
// router.get('/users')

export default router;