import { config } from 'dotenv';
import { Board } from 'src/boards/entities/boards.entity';
import { User } from 'src/users/entities/user.entity';
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
  entities: [User, Board],
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  migrations: [User, Board],
});
