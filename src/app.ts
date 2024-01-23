import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './database/database';

import 'dotenv/config'
const path = require('path');
import { applyMiddlewares } from './middleware';
const cookieParser = require('cookie-parser')
const app = express();
const port = process.env.PORT;

import swaggerOptions from "./swaggerOptions";
const swaggerDocs = swaggerJsDoc(swaggerOptions);


import Core, {ICore} from "./core/core";
export const core: ICore = Core.getInstance()


import routes from './index_routes';
import testRoutes from './selftest/st_router'


applyMiddlewares(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api-docs/swagger-ui.css', (req, res) => {
    res.sendFile(path.join(__dirname, './swa_static/custom-swagger-ui.css'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './build/', 'index.html'));
});

app.use('/', routes);
app.use('/test', testRoutes)

import { DebugController } from './debugger/debugger';
import { st } from "./core/routers/UserRouter";

const debugController = new DebugController(st); // Pass 'st' to the constructor
app.get('/debug/store', debugController.getDebugView);







const runServer = async () =>{
    try {
        await sequelize.sync().then(()=>console.log('Models synced successfully.'));
        app.listen(port, () => {
        });
    }catch (e){
        console.log(e)
    }
}

// syncModels();
runServer()


