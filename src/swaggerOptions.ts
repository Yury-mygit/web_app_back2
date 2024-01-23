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
        './src/core/routers/UserRouter.ts',
        './src/core/routers/office_router.ts',
        './src/core/routers/product_router.ts',
        './src/core/routers/session_router.ts',
        './src/core/routers/payment_router.ts',
        './src/core/routers/employee_router.ts',
        './src/tilda/tilda_router.ts',
        './src/selftest/st_router.ts'
    ],
};

export default swaggerOptions