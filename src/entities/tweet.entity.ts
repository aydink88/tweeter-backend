import { UserEntity } from './user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import type { TCommentAllowed } from 'src/tweet/tweet.interface';
import { HashtagEntity } from './hashtag.entity';

@Entity('tweets')
export class TweetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 280 })
  text: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: 'everyone' })
  commentAllowed: TCommentAllowed;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP', //Date.now().toString(),
  })
  createdAt: Date;

  @Column({ name: 'author_id' })
  authorId: number;

  @ManyToOne(() => UserEntity, (user) => user.tweets, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.tweet)
  comments: CommentEntity[];

  @ManyToMany(() => UserEntity, (user) => user.favorites)
  @JoinTable()
  favoritedByUsers: UserEntity[];

  @ManyToMany(() => UserEntity, (user) => user.retweets)
  retweetedByUsers: UserEntity[];

  @ManyToMany(() => UserEntity, (user) => user.saves)
  @JoinTable()
  savedByUsers: UserEntity[];

  @ManyToMany(() => HashtagEntity, (tag) => tag.tweets, {
    cascade: true,
    eager: true,
  })
  hashtags: HashtagEntity[];
}
