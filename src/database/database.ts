import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    database: 'gs',
    dialect: 'postgres',
    username: 'postgres',
    password: '321',
    host: 'localhost',
    port: 5400,
    models: [__dirname + '/models'], // or [Player, Team]
    logging: false, // Disable logging
});