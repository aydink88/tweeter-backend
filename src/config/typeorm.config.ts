import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import databaseConfig from './database-config';

// export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (): Promise<TypeOrmModuleOptions> => {
//     return {
//       name: 'default',
//       type: 'mysql',
//       logging: false,
//       entities: [UserEntity, TweetEntity, CommentEntity, HashtagEntity],
//       migrationsRun: false,
//       synchronize: false,
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT, 10),
//       username: process.env.DB_USERNAME,
//       database: process.env.DB_NAME,
//       password: process.env.DB_PASSWORD,
//       migrations: [__dirname + '/../migrations/*{.ts,.js}'],
//       extra: {
//         charset: 'utf8mb4_unicode_ci',
//       },
//     };
//   },
// };

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   name: 'default',
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   entities: [__dirname + '/../entities/*.entity.ts'],
//   migrations: [__dirname + '/../migrations/*{.ts,.js}'],
//   extra: {
//     charset: 'utf8mb4_unicode_ci',
//   },
//   synchronize: false,
//   logging: true,
// };

export const typeOrmConfig: TypeOrmModuleOptions = databaseConfig;

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return databaseConfig;
  },
};

// export const seedConfig: TypeOrmModuleOptions = {
//   name: 'seed',
//   type: 'mysql',
//   host: 'remotemysql.com',
//   port: 3306,
//   username: 'iGyvwpAlV1',
//   password: 'tPbIlflatX',
//   database: 'iGyvwpAlV1',
//   entities: ['dist/entities/*.entity.js'],
//   migrations: ['dist/seeds/*.js'],
//   migrationsRun: false,
//   synchronize: false,
//   charset: 'utf8mb4',
// };
