import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { dbSchema } from '../src/utils/env/env.schema';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BooksEntity } from '../src/books/entities/Books.entity';

dotenv.config({ path: './.env.test' });

export const MIGRATIONS_TABLE = 'migrations';

const env = dbSchema.parse(process.env);

const config = {
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  logging: true,
  synchronize: false,
  migrationsTableName: MIGRATIONS_TABLE,
  entities: [BooksEntity],
  migrations: [path.join(__dirname, '..', '..', 'migrations', '*.js')],
} satisfies TypeOrmModuleOptions;

const datasource = new DataSource(config);

export default datasource;
