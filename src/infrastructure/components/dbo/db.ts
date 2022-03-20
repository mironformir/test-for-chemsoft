import { Sequelize } from 'sequelize';

export const databaseConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT.toString(), 10),
    dialect: 'postgres',
  }
);
