import express from 'express';
import studentsRouter from './routers/student_router';
import employeesRouter from './routers/EmployeeRouter';
import sessionsRouter from './routers/session_router';
import officesRouter from './routers/office_router';
import paymentsRouter from './routers/payment_router';
import testRouter from './routers/test_router'

const router = express.Router();

router.use('/students', studentsRouter);
router.use('/employee', employeesRouter);
router.use('/session', sessionsRouter);
router.use('/offices', officesRouter);
router.use('/payments', paymentsRouter);
router.use('/fake', testRouter)

// router.post('/registration')
// router.post('/login')
// router.post('/logout')
// router.get('/activate/:link')
// router.get('/refresh')
// router.get('/users')

export default router;