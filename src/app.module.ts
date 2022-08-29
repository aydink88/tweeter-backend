import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { FollowModule } from './follow/follow.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { typeOrmAsyncConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    TweetModule,
    FollowModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

// Username: iGyvwpAlV1

// Database name: iGyvwpAlV1

// Password: tPbIlflatX

// Server: remotemysql.com

// Port: 3306

// {
//   // type: 'better-sqlite3',
//   // database: './database/twdb.sqlite3',
//   // //entities: ['dist/**/*.entity{.ts,.js}'],
//   entities: [CommentEntity, TweetEntity, UserEntity, FollowEntity],
//   //synchronize: true,
//   type: 'mysql',
//   host: 'remotemysql.com',
//   port: 3306,
//   username: 'iGyvwpAlV1',
//   password: 'tPbIlflatX',
//   database: 'iGyvwpAlV1',
// }
