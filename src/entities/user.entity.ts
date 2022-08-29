import * as argon2 from 'argon2';
import { CommentEntity } from './comment.entity';
import { TweetEntity } from './tweet.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  handle: string;

  @Column({ unique: true, select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  avatar: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(() => TweetEntity, (tweet) => tweet.author)
  tweets: TweetEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: CommentEntity[];

  @ManyToMany(() => TweetEntity, (tweet) => tweet.favoritedByUsers)
  favorites: TweetEntity[];

  @ManyToMany(() => TweetEntity, (tweet) => tweet.retweetedByUsers)
  @JoinTable()
  retweets: TweetEntity[];

  @ManyToMany(() => TweetEntity, (tweet) => tweet.savedByUsers)
  saves: TweetEntity[];

  @ManyToMany(() => CommentEntity, (comment) => comment.likedByUsers)
  likedComments: CommentEntity[];

  @ManyToMany(() => UserEntity, (user) => user.following)
  @JoinTable()
  followers: UserEntity[];

  @ManyToMany(() => UserEntity, (user) => user.followers)
  following: UserEntity[];
}
