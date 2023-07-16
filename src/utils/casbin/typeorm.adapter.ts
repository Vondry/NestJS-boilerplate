import TypeORMAdapter from 'typeorm-adapter';
import * as process from 'process';

export const createTypeORMAdapter = () =>
  TypeORMAdapter.newAdapter({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
