import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('followers/:userid')
  getFollowers(@Param('userid') userId: number) {
    return this.followService.getFollowersOf(userId);
  }

  @Get('following/:userid')
  getFollowings(@Param('userid') userId: number) {
    return this.followService.getFollowingsOf(userId);
  }

  // fix later
  @Get('amifollowingfollowers/:userid')
  getFollowingFollowers(
    @User('id') myId: number,
    @Param('userid') targetId: number,
  ) {
    return this.followService.amIFollowingSomeonesFollowing(targetId, myId);
  }

  @Get('recommendations')
  @UseGuards(AuthGuard)
  getFollowRecommendations(@User('id') userId: number) {
    return this.followService.getFollowRecommendations(userId);
  }

  @Get(':username')
  // @UseGuards(AuthGuard)
  getProfile(
    @User('id') userId: number,
    @Param('username') targetHandle: string,
  ) {
    return this.followService.getProfile(targetHandle, userId);
  }

  @Post(':username')
  @UseGuards(AuthGuard)
  followProfile(
    @User() user: UserEntity,
    @Param('username') targetHandle: string,
  ) {
    return this.followService.follow(user, targetHandle);
  }

  @Delete(':username')
  @UseGuards(AuthGuard)
  unfollowProfile(
    @User('id') userId: number,
    @Param('username') targetHandle: string,
  ) {
    return this.followService.unfollow(userId, targetHandle);
  }
}
