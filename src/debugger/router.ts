import express from 'express';
import studentsRouter from "../subject/user/UserRouter";

const router = express.Router();


router.use('/', studentsRouter);