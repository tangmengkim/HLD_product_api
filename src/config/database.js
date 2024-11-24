const { PostgresDialect } = require("@sequelize/postgres");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MSSQL_DATABASE,
  process.env.MSSQL_NAME,
  process.env.MSSQL_PASSWORD,
  {
    host: process.env.MSSQL_HOST,
    dialect: 'postgres',
    port: 5432,
    ssl: true,
    clientMinMessages: 'notice'
  }
);
//hello
module.exports = sequelize;
