import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { dbSchema } from '../src/utils/env/env.schema';

dotenv.config();

const env = dbSchema.parse(process.env);

export const MIGRATIONS_TABLE = 'migrations';

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
  entities: [path.join(__dirname, '..', 'src', '**', '*.entity.js')],
  migrations: [path.join(__dirname, 'history', '*.js')],
} satisfies DataSourceOptions;

export default new DataSource(config);
