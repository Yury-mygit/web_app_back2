import express from 'express';
import path from 'path';
import cors from "cors";
import bodyParser from "body-parser";
const cookieParser = require('cookie-parser')

interface SyntaxErrorWithStatus extends SyntaxError {
    status?: number;
}

export const applyMiddlewares = (app: express.Application) => {
    app.use(express.json());

    app.use(express.static(path.join(__dirname, './build/')));
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log(req.body); // This will be logged for every request

        next();
    });
    app.use((err: SyntaxErrorWithStatus, req: express.Request, res: express.Response, next: express.NextFunction) => {
        // console.log(err); // Log all errors

        if (err.status === 400 && 'body' in err) {
            return res.status(400).send({ message: "Invalid JSON", error: err.message }); // Include error message

        }

        next();
    });

    app.use(cookieParser())
    app.use(cors({
        origin: ['http://localhost:3002','http://localhost:3000','https://ebbc-176-115-195-132.ngrok-free.app/']
    }));
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
};
