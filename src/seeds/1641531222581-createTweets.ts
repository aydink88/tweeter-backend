import { TweetEntity } from '../entities/tweet.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as tweets from './tweets.json';

export class createTweets1641531222581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(
      TweetEntity,
      tweets.map((t) => ({
        ...t,
        authorId: Number(t.owner.id),
        createdAt: new Date(t.publishDate),
        id: undefined,
      })),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(TweetEntity, '*');
  }
}
