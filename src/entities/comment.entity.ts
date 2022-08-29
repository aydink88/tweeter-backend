import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TweetEntity } from './tweet.entity';
import { UserEntity } from './user.entity';

// TODO: consider eager relations

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: '' })
  image: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP', //Date.now().toString(),
  })
  createdAt: Date;

  @Column({ name: 'author_id' })
  authorId: number;

  @Column({ name: 'tweet_id' })
  tweetId: number;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @ManyToOne(() => TweetEntity, (tweet) => tweet.comments)
  @JoinColumn({ name: 'tweet_id' })
  tweet: TweetEntity;

  @ManyToMany(() => UserEntity, (user) => user.likedComments)
  @JoinTable()
  likedByUsers: UserEntity[];
}
