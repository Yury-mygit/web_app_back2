# Project Setup

This guide will walk you through setting up a new Node.js project with TypeScript, Express, PostgreSQL, Sequelize, Node-Schedule, and Axios.

## Step 1: Initialize a new Node.js project

Create a new directory for your project, navigate into it, and initialize a new Node.js project:

```bash
mkdir web_app_bask2
```

```bash
cd web_app_bask2
```
```bash
npm init -y
```

```bash
npm install express sequelize pg pg-hstore axios
```
```bash
npm install --save-dev typescript ts-node @types/node @types/express @types/sequelize @types/node-schedule
```

```bash
npm install --save sequelize pg-hstore pg sequelize-typescript
```


Create a tsconfig.json file:
```bash
npx tsc --init
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```





Create a new src directory and a server.ts file inside it:
```bash
mkdir src

```
```bash
touch src/server.ts
```


Open src/server.ts and write a simple Express app:
```typescript
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

```

nodemon.json
```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node ./src/server.ts"
}
```
package.json
```json
{
  "name": "my_project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
"scripts": {
  "start": "tsc && node dist/server.js",
  "dev": "nodemon"
},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "nodemon": "^3.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.3.2"
  }
}
```

tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

## NODEMON
nodemon.json
```bash
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node ./src/server.ts"
}
```
run
```bash
npm run dev
```


To use nodemon in inspection mode, follow these steps:
Install nodemon if you haven't already.  
You can install it globally with npm install -g nodemon or as a dev dependency in your project with npm install --save-dev nodemon.  
Run your script with nodemon and the --inspect flag.   
Replace your-script.js with the path to your main Node.js file.   
For example:  
```bash
nodemon --inspect src/app.ts
```

```bash
nodemon --inspect=9230 src/app.ts
```
Open Chrome and navigate to chrome://inspect.   
Click on "Open dedicated DevTools for Node".  
In the DevTools window, click on "Add connection" and enter localhost:9230 (or whatever port you specified).  
Your Node.js application should now be listed under "Remote Target". Click on "inspect" to open a debugging session.  
You can now set breakpoints, step through your code, inspect variables, and see console output in the DevTools window  

## Swagger
To use Swagger UI with Express, you'll need to install two npm packages: swagger-ui-express and swagger-jsdoc. Here are the steps:

Install the necessary packages

```bash
npm install swagger-ui-express swagger-jsdoc
```

```bash
npm i --save-dev @types/swagger-jsdoc
```

```bash
npm i --save-dev @types/swagger-ui-express

```

In your main server file (e.g., server.ts), you'll need to set up swagger-jsdoc and swagger-ui-express:

```typescript
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

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
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

```


This sets up a new route (/api-docs) in your Express app where the generated Swagger documentation will be served.
Document your routes
You can now document your routes using JSDoc-style comments. These comments should be placed directly above your route handlers. Here's an example:

```typescript
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});


```

Start your server as usual. You should now be able to access your Swagger documentation at http://localhost:3000/api-docs.
Remember to replace './src/routes/*.ts' in the swaggerOptions object with the actual path to your route files, and update the url in the servers array to match your server's URL.

## BODY-PARSER
```bash
npm install body-parser --save
```
To handle HTTP POST requests in Express.js version 4 and above, you need to install the middleware module called body-parser.

body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.

The middleware was a part of Express.js earlier but now you have to install it separately.

This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request. Install body-parser using NPM as shown below.

## CORS
```bash
npm install cors
```
```bash
npm i --save-dev @types/cors
```


```typescript

```

## Logging

To log all requests and errors in an Express application, you can use middleware like morgan and winston.
Morgan is a HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application.
Install it with npm:

```bash
  npm install morgan
```
Then, use it in your application:

```typescript
 const morgan = require('morgan');

   // Use morgan middleware for logging
   app.use(morgan('combined'));
```

 
   

The 'combined' argument means that the logs will be detailed, including information like the remote address, HTTP method, URL, status code, user agent, etc.
Winston is a multi-transport async logging library for Node.js. It's capable of logging errors to multiple storage systems (transports).
Install it with npm:

```bash
npm install winston
```

```typescript
   const winston = require('winston');

   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     defaultMeta: { service: 'user-service' },
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' }),
     ],
   });

   // Error handling middleware
   app.use((err, req, res, next) => {
     logger.error(err.stack);
     res.status(500).send('Something broke!');
   });


```

## DOTENV
```bash
npm i dotenv
```


## FAKER
https://www.npmjs.com/package/@faker-js/faker

```bash
npm install --save-dev @faker-js/faker
```

cookie-parser
```BASH
$ npm install cookie-parser
```

```bash
npm i express-validator
```

This will log all errors to error.log and all logs to combined.log.
Remember to place the error handling middleware after all your routes, so that any errors that occur while handling requests will be passed to it.

https://www.youtube.com/watch?v=rXfSZRI-RP8&t=274s&ab_channel=IT-KAMASUTRA