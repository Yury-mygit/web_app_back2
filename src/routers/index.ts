import express from 'express';
import studentsRouter from './routers/StudentRouter';
import employeesRouter from './routers/EmployeeRouter';
import sessionsRouter from './routers/SessionRouter';
import officesRouter from './routers/OfficeRouter';
import paymentsRouter from './routers/PaymentRouter';
import testRouter from './routers/TestRouter'

const router = express.Router();

router.use('/students', studentsRouter);
router.use('/employees', employeesRouter);
router.use('/session', sessionsRouter);
router.use('/offices', officesRouter);
router.use('/payments', paymentsRouter);
router.use('/test', testRouter)

// router.post('/registration')
// router.post('/login')
// router.post('/logout')
// router.get('/activate/:link')
// router.get('/refresh')
// router.get('/users')

export default router;