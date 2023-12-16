import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({
  path: __dirname + '/../../.env',
});

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  entities: [__dirname + '/../../src/**/*.entity{.js,.ts}'],
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  migrations: [__dirname + '/../../src/migration/*.ts'],
});
