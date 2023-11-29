import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routers/routes';



const app = express();
app.use(cors()); // Use cors as a middlewar
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
import { sequelize } from './database/database';
import { Student } from './models/Student';

const port = 3001;

async function syncModels() {
  try {
    await sequelize.sync();
    console.log('Models synced successfully.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
}

syncModels();

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
        url: 'http://localhost:3001',
      },
    ],
    tags: [
      { name: 'Student' },
      { name: 'default' },
      { name: 'Tag3' },
      // Add more tags as needed
    ],
  },
  apis: [
      './src/app.ts',
      './src/routers/routes.ts',
      './src/routers/testrouter.ts',
      './src/routers/students.ts'
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
