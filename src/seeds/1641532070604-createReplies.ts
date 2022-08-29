import { MigrationInterface, QueryRunner } from 'typeorm';
import * as replies from './replies.json';
import { CommentEntity } from 'src/entities/comment.entity';

export class createReplies1641532070604 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(
      CommentEntity,
      replies.map((r) => ({
        text: r.message,
        authorId: getRandomInt(1, 10),
        createdAt: new Date(r.publishDate),
        tweetId: getRandomInt(1, 50),
      })),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(CommentEntity, '*');
  }
}

// min and max are inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
