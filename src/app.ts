import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './database/database';
import routes from './routers';
import 'dotenv/config'

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
            { name: 'Tilda' },
            { name: 'Test routes' },
        ],
    },
    apis: [
        './src/app.ts',
        './src/routers/index.ts',
        './src/routers/routers/TestRouter.ts',
        './src/routers/routers/StudentRouter.ts',
        './src/routers/routers/OfficeRouter.ts',
        './src/routers/routers/SessionRouter.ts',
        './src/routers/routers/PaymentRouter.ts',
        './src/routers/routers/EmployeesRouter.ts'
    ],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3002'
})); // Use cors as a middlewar
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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


