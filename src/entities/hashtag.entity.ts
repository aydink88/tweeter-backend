import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TweetEntity } from './tweet.entity';

@Entity('hashtags')
export class HashtagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  text: string;

  @ManyToMany(() => TweetEntity, (tweet) => tweet.hashtags)
  @JoinTable()
  tweets: TweetEntity[];
}
