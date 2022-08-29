import { DataSource } from 'typeorm';
import databaseConfig from './database-config';

// export const AppDataSource = new DataSource({
//   name: 'default',
//   type: 'mysql',
//   host: 'remotemysql.com',
//   port: 3306,
//   username: 'iGyvwpAlV1',
//   database: 'iGyvwpAlV1',
//   password: 'tPbIlflatX',
//   entities: [__dirname + '/../entities/*.entity.ts'],
//   migrations: [__dirname + '/../migrations/*{.ts,.js}'],
//   extra: {
//     charset: 'utf8mb4_unicode_ci',
//   },
//   synchronize: false,
//   logging: true,
// });

// export const AppDataSource = new DataSource({
//   name: 'default',
//   type: 'better-sqlite3',
//   database: 'database/db.sqlite',
//   entities: [__dirname + '/../entities/*.entity.ts'],
//   migrations: [__dirname + '/../migrations/*{.ts,.js}'],
//   synchronize: false,
//   logging: true,
// });

export const AppDataSource = new DataSource(databaseConfig);
