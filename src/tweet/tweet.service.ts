import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TweetEntity } from 'src/entities/tweet.entity';
import { Tweet } from './tweet.interface';
import paginate from 'src/shared/paginate';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import { RESPONSE_ITEM_LIMIT } from 'src/config';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetEntity)
    private tweetRepository: Repository<TweetEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(HashtagEntity)
    private hashtagRepository: Repository<HashtagEntity>,
  ) {}

  async create(newTweet: Tweet, hashtags?: string[]) {
    if (newTweet.text.length > 280) {
      throw new BadRequestException('No more than 280 characters');
    }
    const commentStricted =
      newTweet.commentAllowed === 'followed' ||
      newTweet.commentAllowed === 'noone';

    const tweetToInsert = this.tweetRepository.create(newTweet);

    tweetToInsert.commentAllowed = commentStricted
      ? newTweet.commentAllowed
      : 'everyone';

    if (hashtags) {
      tweetToInsert.hashtags = [];
      for (const h of hashtags) {
        const foundTag = await this.hashtagRepository.findOneBy({
          text: h,
        });

        {
          tweetToInsert.hashtags.push(
            foundTag ? foundTag : this.hashtagRepository.create({ text: h }),
          );
        }
      }
    }

    await this.tweetRepository.save(tweetToInsert, {});
    return { tweet: tweetToInsert };
  }

  async getUserFeed(userId: number, page = 1, limit = RESPONSE_ITEM_LIMIT) {
    const followProfilesQuery = this.userRepository
      .createQueryBuilder('user')
      .select('following.id as id')
      .where('user.id = :userId', { userId })
      .innerJoin('user.following', 'following');

    const followProfiles = await followProfilesQuery.getRawMany();

    const followings = followProfiles.map((f) => f.id);
    followings.push(userId);

    const feedQueryBase = this.tweetRepository
      .createQueryBuilder('tweet')
      .innerJoinAndSelect(
        'tweet.author',
        'author',
        'author.id IN (:...followings)',
        { followings },
      );

    const feedQuery = this.buildTweetsQueryWithCommonRelations(
      feedQueryBase,
      false,
      true,
      userId,
    ).orderBy('tweet.createdAt', 'DESC');

    const feed = await paginate(feedQuery, {
      page,
      limit,
    }).getMany();

    return { feed, page, limit };
  }

  async getTrends() {
    const trends = await this.hashtagRepository
      .createQueryBuilder('hashtags')
      .leftJoin('hashtags.tweets', 'tweets')
      .select(['hashtags.id as id', 'hashtags.text as text'])
      .addSelect('COUNT(tweets.id) as tweetCount')
      .groupBy('hashtags.id')
      .orderBy('tweetCount', 'DESC')
      .limit(10)
      .getRawMany();
    return { trends };
  }

  async getSearchResults(
    userId: number,
    searchOptions?: {
      searchType: string;
      searchTerm: string;
      page: number;
      limit: number;
    },
  ) {
    const {
      searchType = '',
      searchTerm = '',
      page = 1,
      limit = RESPONSE_ITEM_LIMIT,
    } = {
      ...searchOptions,
    };
    const baseQb = this.tweetRepository.createQueryBuilder('tweet');
    let qb = this.buildTweetsQueryWithCommonRelations(
      baseQb,
      false,
      false,
      userId,
    );

    switch (searchType) {
      case 'latest':
        qb = qb.orderBy('tweet.createdAt', 'DESC');
        break;
      case 'media':
        qb = qb.andWhere('tweet.image != :img', { img: '' });
        break;
      default:
        return this.getTopTweets(searchTerm, userId);
    }

    if (searchTerm) {
      qb = qb.where('tweet.text like :searchTerm', {
        searchTerm: '%' + searchTerm + '%',
      });
    }

    const tweets = await paginate(qb, { page, limit }).getMany();
    return { tweets };
  }

  async getTopTweets(searchTerm = '', userId?: number) {
    // most favorited tweets assumed as top tweets
    let tweetQb = this.tweetRepository
      .createQueryBuilder('tweet')
      .select([
        'tweet.id as id',
        'tweet.text as text',
        'COUNT(favUsers.id) as favCount',
      ])
      .innerJoin('tweet.favoritedByUsers', 'favUsers')
      .groupBy('tweet.id')
      .orderBy('favCount', 'DESC')
      .limit(20);

    if (searchTerm) {
      tweetQb = tweetQb.where('text like :searchTerm', {
        searchTerm: '%' + searchTerm + '%',
      });
    }
    const foundTweets = await tweetQb.getRawMany();
    const tweetIds = foundTweets.map((r) => r.id);

    const resultsQuery = this.tweetRepository
      .createQueryBuilder('tweet')
      .whereInIds(tweetIds);

    const tweets = await this.buildTweetsQueryWithCommonRelations(
      resultsQuery,
      false,
      false,
      userId,
    ).getMany();

    return { tweets };
  }

  // subquery example (otherwise useless)
  // async getTopTweets() {
  //   const qb = this.tweetRepository
  //     .createQueryBuilder('tweet')
  //     .innerJoinAndSelect(
  //       (sub) =>
  //         sub
  //           .select(['alltweets.id as id', 'COUNT(favUsers.id) as favCount'])
  //           .from(TweetEntity, 'alltweets')
  //           .innerJoin('alltweets.favoritedByUsers', 'favUsers')
  //           .groupBy('alltweets.id')
  //           .orderBy('favCount', 'DESC')
  //           .limit(20),
  //       'tweet_favcount',
  //       'tweet_favcount.id = tweet.id',
  //     )
  //     .leftJoinAndSelect('tweet.author', 'author')
  //     .leftJoinAndSelect('tweet.retweetedByUsers', 'retweetedByUsers')
  //     .leftJoinAndSelect('tweet.savedByUsers', 'savedByUsers')
  //     .leftJoinAndSelect('tweet.favoritedByUsers', 'favoritedByUsers')
  //     .leftJoinAndSelect('tweet.hashtags', 'hashtags');
  //   const results = await qb.getRawMany();
  //   return { results };
  // }

  async getTweetsByHashtag(
    hashtagId: number,
    page = 1,
    limit = RESPONSE_ITEM_LIMIT,
  ) {
    const hashtag = await paginate(
      this.hashtagRepository
        .createQueryBuilder('hashtags')
        .innerJoinAndSelect('hashtags.tweets', 'tweets')
        .leftJoinAndSelect('tweets.author', 'author')
        .leftJoinAndSelect('tweets.hashtags', 'tweet_hashtags')
        .where('hashtags.id = :hashtagId', { hashtagId }),
      { page, limit, applyToResults: true },
    ).getOne();

    return { tweets: hashtag?.tweets || [], page, limit };
  }

  async getTweetsByUser(userId: number) {
    const results = await this.tweetRepository.find({
      where: { authorId: userId },
    });
    return results;
  }

  // unused for now
  async getTweetsByHandle(username: string, includeReplies: number) {
    const baseQb = this.tweetRepository.createQueryBuilder('tweet');

    const query = this.buildTweetsQueryWithCommonRelations(
      baseQb,
      !!includeReplies,
      false,
    ).where('author.handle = :handle', { handle: username });

    const tweets = await query.getMany();

    return { tweets };
  }

  // prototype
  async getFavoriteTweetsByHandle(
    username: string,
    page = 1,
    limit = RESPONSE_ITEM_LIMIT,
  ) {
    const baseQb = this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.favoritedByUsers', 'favUsers')
      .where('favUsers.handle = :username', { username });

    const favorites = await paginate(
      this.buildTweetsQueryWithCommonRelations(baseQb, false, false),
      { page, limit },
    ).getMany();

    return { profile: { favorites }, page, limit };
  }

  // currently unused
  async getSavedTweets(userId: number, page = 1, limit = RESPONSE_ITEM_LIMIT) {
    const savedTweetsQuery = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.saves', 'savedTweets')
      .leftJoinAndSelect('savedTweets.author', 'saved_author')
      .where('user.id = :userId', { userId });

    const { saves: savedTweets } = await paginate(savedTweetsQuery, {
      page,
      applyToResults: true,
    }).getOne();

    return { tweets: savedTweets, page, limit };
  }

  async getSavedTweetsWithInteractions(
    userId: number,
    includeReplies?: number,
    onlyMedia?: number,
    favorited?: number,
    page = 1,
    limit = RESPONSE_ITEM_LIMIT,
  ) {
    let query = this.userRepository
      .createQueryBuilder('users')
      .where('users.id = :userId', {
        userId,
      })
      .leftJoinAndSelect('users.saves', 'savedTweets')
      .leftJoinAndSelect('savedTweets.author', 'saved_author')
      .leftJoinAndSelect('savedTweets.hashtags', 'tweets_hashtags')
      .leftJoinAndSelect(
        'savedTweets.retweetedByUsers',
        'tweets_retweetedByUsers',
      )
      .leftJoinAndSelect('savedTweets.savedByUsers', 'tweets_savedByUsers')
      .leftJoinAndSelect(
        'savedTweets.favoritedByUsers',
        'tweets_favoritedByUsers',
      );

    if (favorited) {
      query = query
        .leftJoinAndSelect('users.favorites', 'fav_tweets')
        .andWhere('fav_tweets.id = savedTweets.id');
    }

    if (includeReplies) {
      query = query
        .leftJoinAndSelect('savedTweets.comments', 'savedTweets_comments')
        .leftJoinAndSelect(
          'savedTweets_comments.author',
          'savedTweets_comments_author',
        )
        .leftJoinAndSelect(
          'savedTweets_comments.likedByUsers',
          'savedTweets_comments_likedByUsers',
        );
    }

    if (onlyMedia) {
      query = query.andWhere('savedTweets.image != :image', {
        image: '',
      });
    }
    const foundUser = await paginate(query, {
      page,
      limit,
      applyToResults: true,
    }).getOne();
    return { savedTweets: foundUser?.saves || [] };
  }

  async getTweetsWithInteractions(
    username: string,
    options?: {
      includeReplies?: number;
      onlyMedia?: number;
      userId?: number;
      page: number;
      limit: number;
    },
  ) {
    const {
      onlyMedia = 0,
      includeReplies = 0,
      userId = 0,
      page = 1,
      limit = RESPONSE_ITEM_LIMIT,
    } = options;
    const baseQb = this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoin('tweet.retweetedByUsers', 'retweetedByUsers')
      .where('author.handle = :username', { username })
      .orWhere('retweetedByUsers.handle = :handle', { handle: username });

    let query = this.buildTweetsQueryWithCommonRelations(
      baseQb,
      !!includeReplies,
      false,
      userId,
    );

    if (onlyMedia) {
      query = query.andWhere('tweet.image != :image', {
        image: '',
      });
    }

    const tweets = await paginate(query, { page, limit }).getMany();

    return { tweets };
  }

  // reimplement with private builder function, after client side implementation
  async getTweetWithComments(tweetId: number) {
    const tweet = await this.tweetRepository.findOne({
      where: { id: tweetId },
      relations: { comments: true, hashtags: true },
    });
    return { tweet };
  }

  async favoriteTweet(tweetId: number, user: UserEntity) {
    const tweet = await this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.favoritedByUsers', 'favoritedByUsers')
      .leftJoinAndSelect('tweet.author', 'author')
      .where('tweet.id=:tweetId', { tweetId })
      .getOne();

    if (tweet.author.id === user.id) {
      throw new BadRequestException('You cannot retweet your own tweet');
    }

    const userFavorited = tweet.favoritedByUsers.find((u) => u.id === user.id);

    if (!userFavorited) {
      tweet.favoritedByUsers.push(user);
      await this.tweetRepository.save(tweet);
    }

    return { tweet };
  }

  async unfavoriteTweet(tweetId: number, userId: number) {
    const tweet = await this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.favoritedByUsers', 'favoritedByUsers')
      .where('tweet.id=:tweetId', { tweetId })
      .getOne();

    const userFavoritedIndex = tweet.favoritedByUsers.findIndex(
      (u) => u.id === userId,
    );

    if (userFavoritedIndex > -1) {
      tweet.favoritedByUsers.splice(userFavoritedIndex, 1);
      await this.tweetRepository.save(tweet);
    }

    return { tweet };
  }

  async retweet(tweetId: number, user: UserEntity) {
    const tweet = await this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.retweetedByUsers', 'retweetedByUsers')
      .leftJoinAndSelect('tweet.author', 'author')
      .where('tweet.id=:tweetId', { tweetId })
      .getOne();

    if (tweet.author.id === user.id) {
      throw new BadRequestException('You cannot retweet your own tweet');
    }

    const userRetweeted = tweet.retweetedByUsers.find((u) => u.id === user.id);

    if (!userRetweeted) {
      tweet.retweetedByUsers.push(user);
      await this.tweetRepository.save(tweet);
    }

    return { tweet };
  }

  async unretweet(tweetId: number, userId: number) {
    const tweet = await this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.retweetedByUsers', 'retweetedByUsers')
      .where('tweet.id=:tweetId', { tweetId })
      .getOne();

    const userRetweetedIndex = tweet.retweetedByUsers.findIndex(
      (u) => u.id === userId,
    );

    if (userRetweetedIndex > -1) {
      tweet.retweetedByUsers.splice(userRetweetedIndex, 1);
      await this.tweetRepository.save(tweet);
    }

    return { tweet };
  }

  async save(tweetId: number, user: UserEntity) {
    const tweet = await this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.savedByUsers', 'savedByUsers')
      .where('tweet.id=:tweetId', { tweetId })
      .getOne();

    const userSaved = tweet.savedByUsers.find((u) => u.id === user.id);

    if (!userSaved) {
      tweet.savedByUsers.push(user);
      await this.tweetRepository.save(tweet);
    }

    return { tweet };
  }

  async unsave(tweetId: number, userId: number) {
    const tweet = await this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.savedByUsers', 'savedByUsers')
      .where('tweet.id=:tweetId', { tweetId })
      .getOne();

    const userSavedIndex = tweet.savedByUsers.findIndex((u) => u.id === userId);

    if (userSavedIndex > -1) {
      tweet.savedByUsers.splice(userSavedIndex, 1);
      await this.tweetRepository.save(tweet);
    }

    return { tweet };
  }

  private buildTweetsQueryWithCommonRelations(
    baseQueryBuilder: SelectQueryBuilder<TweetEntity>,
    withReplies: boolean,
    customAuthor: boolean,
    userId?: number,
  ) {
    let resultsQb = baseQueryBuilder
      .leftJoinAndSelect('tweet.hashtags', 'hashtags')
      .loadRelationCountAndMap(
        'tweet.savedCount',
        'tweet.savedByUsers',
        'savedCount',
      )
      .loadRelationCountAndMap(
        'tweet.commentCount',
        'tweet.comments',
        'commentCount',
      )
      .loadRelationCountAndMap(
        'tweet.retweetCount',
        'tweet.retweetedByUsers',
        'retweetCount',
      )
      .take(20);

    if (userId) {
      resultsQb = resultsQb
        .leftJoinAndMapOne(
          'tweet.isSaved',
          'tweet.savedByUsers',
          'isSaved',
          'isSaved.id = :userId',
          { userId },
        )
        .leftJoinAndMapOne(
          'tweet.isFavorited',
          'tweet.favoritedByUsers',
          'isFavorited',
          'isFavorited.id = :userId',
          { userId },
        )
        .leftJoinAndMapOne(
          'tweet.isRetweeted',
          'tweet.retweetedByUsers',
          'isRetweeted',
          'isRetweeted.id = :userId',
          { userId },
        );
    }

    if (withReplies) {
      resultsQb = resultsQb
        .leftJoinAndSelect('tweet.comments', 'comments')
        .leftJoinAndSelect('comments.author', 'comment_author')
        .leftJoinAndSelect('comments.likedByUsers', 'comment_likedByUsers');
    }

    if (!customAuthor) {
      resultsQb.leftJoinAndSelect('tweet.author', 'author');
    }

    return resultsQb;
  }
}
