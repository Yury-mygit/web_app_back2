import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './database/database';
import routes from './index_routes';
import 'dotenv/config'
const path = require('path');
const fs = require('fs');

import Store from './servises/store'
import StoreDebugger from "./servises/storeDebug";
import StoreManager from "./servises/StoreManager";

const cookieParser = require('cookie-parser')
const app = express();
const port = process.env.PORT;
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'A simple Express API',
        },
        servers: [
            {
                url: 'http://localhost:3002',
            },
        ],
        tags: [
            { name: "user"},
            { name: 'Employee' },
            { name: 'Office' },
            { name: 'Session' },
            { name: 'Payment' },
            { name: 'Product' },
            { name: 'Tilda endpoint' },
        ],
    },
    apis: [
        './src/app.ts',
        './src/routers/index_routes.ts',
        './src/mok/fake_router.ts',
        './src/subject/user/UserRouter.ts',
        './src/subject/office/office_router.ts',
        './src/subject/product/product_router.ts',
        './src/subject/session/session_router.ts',
        './src/subject/payments/payment_router.ts',
        './src/subject/staff/employee_router.ts',
        './src/tilda/tilda_router.ts'
    ],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

interface SyntaxErrorWithStatus extends SyntaxError {
    status?: number;
}

app.use(express.json())

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api-docs/swagger-ui.css', (req, res) => {
    res.sendFile(path.join(__dirname, './swa_static/custom-swagger-ui.css'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './build/', 'index.html'));
});

app.use('/', routes);

//
// const store = new Store();
// const storeManager = new StoreManager();
// const debuggers = new Map<string, StoreDebugger>();

//
// function createDebuggableStore(storeID: string) {
//     const store = storeManager.createStore(storeID);
//     const debuggerInstance = new StoreDebugger(storeID, store);
//     debuggers.set(storeID, debuggerInstance);
//     return debuggerInstance;
// }
import {st} from "./subject/user/UserRouter"
const storeDebugger = new StoreDebugger(st);
app.get('/debug/store', (req, res) => {
    const changeLog = storeDebugger.getChangeLog();

    // Custom replacer to handle circular references
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key:any, value:any) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return "[Circular]";
                }
                seen.add(value);
            }
            return value;
        };
    };

    let changeLogHtml = changeLog.map(change =>
        `<li>${change.key} - was - <pre>${JSON.stringify(change.oldValue, getCircularReplacer(), 2)}</pre> - became - <pre>${JSON.stringify(change.newValue, getCircularReplacer(), 2)}</pre></li>`
    ).join('');

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Store Debugger</title>
            <style>
                body { font-family: Arial, sans-serif; }
                pre { background-color: #f7f7f7; padding: 5px; border: 1px solid #ddd; }
            </style>
        </head>
        <body>
            <h1>Store Change Log</h1>
            <ul>${changeLogHtml}</ul>
        </body>
        </html>
    `;

    res.send(htmlContent);
});




const runServer = async () =>{
    try {
        await sequelize.sync().then(()=>console.log('Models synced successfully.'));
        app.listen(port, () => {
            // console.log(`Server is running at http://localhost:${port}`);
            // Log(`Server is running at http://localhost:${port}`)
        });
    }catch (e){
        console.log(e)
    }
}

// syncModels();
runServer()


