import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Get,
  Param,
  NotFoundException,
  Delete,
  Query,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CreateTweetDto } from './dto';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @UseGuards(AuthGuard)
  createTweet(@Body() tweet: CreateTweetDto, @User('id') userId: number) {
    const t = { ...tweet, authorId: userId, hashtags: undefined };
    return this.tweetService.create(t, tweet.hashtags);
  }

  @Get('/myfeed')
  // @UseGuards(AuthGuard)
  getMyFeed(
    @User('id') userId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.tweetService.getUserFeed(userId, page, limit);
  }

  @Get('/trends')
  getTrends() {
    return this.tweetService.getTrends();
  }

  @Get('/hashtag/:id')
  getHashtagTweets(
    @Param('id') hashtagId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.tweetService.getTweetsByHashtag(hashtagId, page, limit);
  }

  // not used, remove maybe?
  @Get('me')
  @UseGuards(AuthGuard)
  findMyTweets(@User('id') userId: number) {
    return this.tweetService.getTweetsByUser(userId);
  }

  @Get('/favorites/:username')
  findFavoritesOfUser(
    @Param('username') username: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.tweetService.getFavoriteTweetsByHandle(username, page, limit);
  }

  // @Get('saves')
  // @UseGuards(AuthGuard)
  // findSavedTweets(@User('id') userId: number, @Query('page') page: number) {
  //   return this.tweetService.getSavedTweets(userId, page);
  // }

  @Get('saves')
  @UseGuards(AuthGuard)
  findSavedTweetsWitInteractions(
    @User('id') userId: number,
    @Query('replies') replies: number,
    @Query('media') onlyMedia: number,
    @Query('likes') favorited: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.tweetService.getSavedTweetsWithInteractions(
      userId,
      replies,
      onlyMedia,
      favorited,
      page,
      limit,
    );
  }

  @Get('search/:searchType')
  searchTweets(
    @User('id') userId: number,
    @Param('searchType') searchType: string,
    @Query('search') searchTerm: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.tweetService.getSearchResults(userId, {
      searchTerm,
      searchType,
      page,
      limit,
    });
  }

  @Get('user/:username')
  findTweetsOfUser(
    @Param('username') username: string,
    @Query('replies') replies: number,
    @Query('media') onlyMedia: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @User('id') userId: number,
  ) {
    // replies query 1 true, 0 false
    return this.tweetService.getTweetsWithInteractions(username, {
      includeReplies: replies,
      onlyMedia,
      userId,
      page,
      limit,
    });
  }

  @Get(':id')
  async getTweet(@Param('id') id: number) {
    const tweet = await this.tweetService.getTweetWithComments(id);
    if (!tweet) {
      throw new NotFoundException({ message: 'Fetching tweet failed' });
    }

    return tweet;
  }

  @Post(':id/favorite')
  @UseGuards(AuthGuard)
  favoriteTweet(@Param('id') tweetId: number, @User() user: UserEntity) {
    return this.tweetService.favoriteTweet(tweetId, user);
  }

  @Delete(':id/favorite')
  @UseGuards(AuthGuard)
  unfavoriteTweet(@Param('id') tweetId: number, @User('id') userId: number) {
    return this.tweetService.unfavoriteTweet(tweetId, userId);
  }

  @Post(':id/save')
  @UseGuards(AuthGuard)
  save(@Param('id') tweetId: number, @User() user: UserEntity) {
    return this.tweetService.save(tweetId, user);
  }

  @Delete(':id/save')
  @UseGuards(AuthGuard)
  unsave(@Param('id') tweetId: number, @User('id') userId: number) {
    return this.tweetService.unsave(tweetId, userId);
  }

  @Post(':id/retweet')
  @UseGuards(AuthGuard)
  retweet(@Param('id') tweetId: number, @User() user: UserEntity) {
    return this.tweetService.retweet(tweetId, user);
  }

  @Delete(':id/retweet')
  @UseGuards(AuthGuard)
  unretweet(@Param('id') tweetId: number, @User('id') userId: number) {
    return this.tweetService.unretweet(tweetId, userId);
  }
}
