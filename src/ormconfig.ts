import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  CommentEntity,
  HashtagEntity,
  TweetEntity,
  UserEntity,
} from 'src/entities';

const defaultConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'mysql',
  logging: false,
  host: 'remotemysql.com',
  port: 3306,
  username: 'iGyvwpAlV1',
  password: 'tPbIlflatX',
  database: 'iGyvwpAlV1',
  entities: [UserEntity, TweetEntity, CommentEntity, HashtagEntity],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  synchronize: false,
};

const seedConfig: TypeOrmModuleOptions = {
  name: 'seed',
  type: 'mysql',
  host: 'remotemysql.com',
  port: 3306,
  username: 'iGyvwpAlV1',
  password: 'tPbIlflatX',
  database: 'iGyvwpAlV1',
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/seeds/*.js'],
  migrationsRun: false,
  synchronize: false,
  charset: 'utf8mb4',
};

const seedSqliteConfig: TypeOrmModuleOptions = {
  name: 'seedsqlite',
  type: 'better-sqlite3',
  database: 'database/tweeter.db',
  logging: true,
  synchronize: false,
  entities: [UserEntity, TweetEntity, CommentEntity, HashtagEntity],
  migrations: ['dist/seeds/*.js'],
};

const ormConfig = {
  default: defaultConfig,
  seed: seedConfig,
  seedSqlite: seedSqliteConfig,
};

export default ormConfig;
