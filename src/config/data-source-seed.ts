import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  name: 'default',
  type: 'better-sqlite3',
  database: 'database/db.sqlite',
  entities: [__dirname + '/../entities/*.entity.ts'],
  migrations: [__dirname + '/../seeds/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});
