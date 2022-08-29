import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { TweetEntity } from 'src/entities/tweet.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(CommentEntity)
    private tweetRepository: Repository<TweetEntity>,
    @InjectRepository(CommentEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async addComment(comment: Comment) {
    const tweet = await this.tweetRepository
      .createQueryBuilder('tweet')
      .where('tweet.id=:tweetId', { tweetId: comment.tweetId })
      .getOne();
    if (!tweet || tweet?.commentAllowed === 'noone') {
      throw new BadRequestException({
        message: 'tweet does not exist or replying restricted',
      });
    }

    if (tweet.commentAllowed === 'followed') {
      const tweetAuthor = await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.following', 'following')
        .where('user.id = :authorId', { authorId: tweet.authorId })
        .getOne();
      const followeds: Omit<UserEntity, 'hashPassword'>[] = [
        ...tweetAuthor.following,
        { ...tweetAuthor, following: [] },
      ];
      const proceed = followeds.some((f) => f.id === comment.authorId);
      if (!proceed) {
        throw new BadRequestException({
          message: 'tweet does not exist or replying restricted',
        });
      }
    }

    await this.commentRepository
      .createQueryBuilder('comments')
      .insert()
      .into(CommentEntity)
      .values(comment)
      .execute();
    return { comment };
  }

  async likeComment(commentId: number, user: UserEntity) {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id=:commentId', { commentId })
      .leftJoinAndSelect('comment.likedByUsers', 'likedByUsers')
      .getOne();

    const userFound = comment.likedByUsers.find((u) => u.id === user.id);

    if (!userFound) {
      comment.likedByUsers.push(user);
      await this.commentRepository.save(comment);
    }

    return { comment };
  }

  async unlikeComment(commentId: number, userId: number) {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id=:commentId', { commentId })
      .leftJoinAndSelect('comment.likedByUsers', 'likedByUsers')
      .getOne();

    const userIndex = comment.likedByUsers.findIndex((u) => u.id === userId);

    if (userIndex > -1) {
      comment.likedByUsers.splice(userIndex, 1);
      await this.commentRepository.save(comment);
    }

    return { comment };
  }
}
