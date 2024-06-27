/* eslint-disable import/order */
import 'reflect-metadata';
import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';

import { entities } from './entities';

const rootDir = process.env.NODE_ENV === 'dev' ? './src' : './dist';
const dbOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_DB_HOST,
  port: process.env.MYSQL_DB_PORT
    ? parseInt(process.env.MYSQL_DB_PORT, 10)
    : 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  synchronize: true,
  logging: true,
  entities,
  migrations: [`${rootDir}/database/migrations/**/*{.ts,.js}`],
  subscribers: [`${rootDir}/app/subscribers/**/*{.ts,.js}`],
};

export const appDataSource = new DataSource(dbOptions);

async function initializeDatabaseConnection() {
  try {
    await appDataSource.initialize();
    console.log('Conectado ao banco de dados com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar com o banco: ', error);
  }
}

initializeDatabaseConnection();
