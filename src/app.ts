import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './database/database';
import routes from './routers';
import 'dotenv/config'
const path = require('path');
const fs = require('fs');


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
            { name: 'Student' },
            { name: 'Employee' },
            { name: 'Office' },
            { name: 'Session' },
            { name: 'Payment' },
            { name: 'Tilda endpoint' },
        ],
    },
    apis: [
        './src/app.ts',
        './src/routers/index.ts',
        './src/routers/routers/fake_router.ts',
        './src/routers/routers/student_router.ts',
        './src/routers/routers/office_router.ts',
        './src/routers/routers/session_router.ts',
        './src/routers/routers/payment_router.ts',
        './src/routers/routers/employee_router.ts',
        './src/routers/routers/tilda_router.ts'
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
    console.log(err); // Log all errors

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


//!!!!!!!!!!!
app.get('/api-docs/swagger-ui.css', (req, res) => {
    res.sendFile(path.join(__dirname, './swa_static/custom-swagger-ui.css'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './build/', 'index.html'));
});

app.use('/', routes);


const runServer = async () =>{
    try {
        await sequelize.sync().then(()=>console.log('Models synced successfully.'));
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    }catch (e){
        console.log(e)
    }
}

// syncModels();
runServer()


