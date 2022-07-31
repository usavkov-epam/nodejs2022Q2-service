import 'dotenv/config';

import { DataSourceOptions } from 'typeorm';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export default {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: +POSTGRES_PORT,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  synchronize: false,
  logging: true,
  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/**/migration/*.js'],
  migrationsRun: true,
  migrationsTableName: 'migration',
} as DataSourceOptions;
