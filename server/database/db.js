import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  'dbChat',
  'postgres',
  'YourOwnPassword.', 
  {
    host: 'localhost',
    dialect: 'postgres' 
  }
);
