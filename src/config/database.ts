import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvService } from '../utils/env/env.service';
import { MIGRATIONS_TABLE } from '../../migrations/config';

const migrationsPath = path.join(
  __dirname,
  '..',
  '..',
  'migrations',
  'history',
  '*.js',
);
export const getDbConfig = (envService: EnvService) =>
  ({
    type: 'postgres',
    host: envService.get('DATABASE_HOST'),
    port: envService.get('DATABASE_PORT'),
    username: envService.get('DATABASE_USER'),
    password: envService.get('DATABASE_PASSWORD'),
    database: envService.get('DATABASE_NAME'),
    migrationsTableName: MIGRATIONS_TABLE,
    migrations: [migrationsPath],
    // FIXME Do not auto-run migrations only on TEST ENV (disabled for now for all envs)
    migrationsRun: false,
    synchronize: false,
    retryAttempts: 1,
    autoLoadEntities: true,
  } satisfies TypeOrmModuleOptions);
