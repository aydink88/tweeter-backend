import 'dotenv/config';
import {
  CommentEntity,
  HashtagEntity,
  TweetEntity,
  UserEntity,
} from 'src/entities';
import { DataSourceOptions } from 'typeorm';

// const databaseConfig: DataSourceOptions = {
//   name: 'default',
//   type: 'better-sqlite3',
//   database: process.env.DB_NAME,
//   //entities: [__dirname + '/../entities/*.entity.ts'],
//   entities: [UserEntity, TweetEntity, CommentEntity, HashtagEntity],
//   migrations: [__dirname + '/../migrations/*{.ts,.js}'],
//   synchronize: false,
//   logging: true,
//   migrationsRun: false,
// };

const databaseConfig: DataSourceOptions = {
  name: 'default',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  //entities: [__dirname + '/../entities/*.entity.ts'],
  entities: [UserEntity, TweetEntity, CommentEntity, HashtagEntity],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsRun: false,
};

export default databaseConfig;
