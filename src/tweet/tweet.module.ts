import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { TweetController } from './tweet.controller';
import { TweetEntity } from 'src/entities/tweet.entity';
import { TweetService } from './tweet.service';
import { UserEntity } from 'src/entities/user.entity';
import { CommentController } from './comment.controller';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      TweetEntity,
      UserEntity,
      HashtagEntity,
    ]),
  ],
  controllers: [TweetController, CommentController],
  providers: [TweetService, CommentService],
})
export class TweetModule {}
