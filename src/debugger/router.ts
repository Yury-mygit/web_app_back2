import express from 'express';
import studentsRouter from "../core/routers/UserRouter";

const router = express.Router();


router.use('/', studentsRouter);