import express from 'express';
import studentsRouter from './students';
import employeesRouter from './employees';
import sessionsRouter from './sessions';
import officesRouter from './offices';
import paymentsRouter from './payments';
import testRouter from './testrouter'

const router = express.Router();

router.use('/students', studentsRouter);
router.use('/employees', employeesRouter);
router.use('/sessions', sessionsRouter);
router.use('/offices', officesRouter);
router.use('/payments', paymentsRouter);
router.use('/test', testRouter)


export default router;