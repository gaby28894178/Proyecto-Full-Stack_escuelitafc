const { Client } = require('pg');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

async function ensureDatabaseExists() {
  const client = new Client({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: 'postgres',
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    if (res.rowCount === 0) {
      console.log(`La base de datos "${dbName}" no existe. Creándola...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Base de datos "${dbName}" creada.`);
    }
  } catch (error) {
    console.error('Error al verificar/crear la BD:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  logging: false,
});

module.exports = { sequelize, ensureDatabaseExists };
