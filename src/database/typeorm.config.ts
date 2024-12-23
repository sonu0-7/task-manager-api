import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  database: database,
  username: username,
  password: password,
  host: host,
  port: Number(port),
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
};