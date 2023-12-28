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

export default swaggerOptions