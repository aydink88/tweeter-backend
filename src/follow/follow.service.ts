import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private async checkProfile(targetHandle: string, userId?: number) {
    const foundUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapOne(
        'user.isFollowed',
        'user.followers',
        'isFollowed',
        'isFollowed.id = :userId',
        { userId },
      )
      .where('user.handle = :targetHandle', { targetHandle })
      .loadRelationCountAndMap('user.followerCount', 'user.followers')
      .loadRelationCountAndMap('user.followingCount', 'user.following')
      .getOne();

    if (!foundUser) {
      throw new NotFoundException({ message: 'User not found' });
    }

    return foundUser;
  }

  async getProfile(targetHandle: string, userId?: number) {
    const foundUser = await this.checkProfile(targetHandle, userId);

    if (!userId) {
      return { profile: { ...foundUser, isFollowed: false } };
    }

    return {
      profile: { ...foundUser },
    };
  }

  async follow(user: UserEntity, targetHandle: string) {
    if (!user.id || !targetHandle) {
      throw new BadRequestException({
        message: 'You have to provide users identifiers',
      });
    }

    const targetProfile = await this.userRepository
      .createQueryBuilder('user')
      .where('user.handle = :targetHandle', { targetHandle })
      .leftJoinAndSelect('user.followers', 'followers')
      .getOne();

    if (targetProfile.id === user.id) {
      throw new BadRequestException({
        message: 'You cannot follow yourself',
      });
    }

    const followerIndex = targetProfile.followers.findIndex(
      (u) => u.id === user.id,
    );

    if (followerIndex === -1) {
      targetProfile.followers.push(user);
      await this.userRepository.save(targetProfile);
    }

    return {
      profile: { ...targetProfile, followers: undefined, isFollowed: true },
    };
  }

  async unfollow(userId: number, targetHandle: string) {
    if (!userId || !targetHandle) {
      throw new BadRequestException({
        message: 'You have to provide users identifiers',
      });
    }

    const targetProfile = await this.userRepository
      .createQueryBuilder('user')
      .where('user.handle = :targetHandle', { targetHandle })
      .leftJoinAndSelect('user.followers', 'followers')
      .getOne();

    const followerIndex = targetProfile.followers.findIndex(
      (u) => u.id === userId,
    );

    if (targetProfile.id === userId) {
      throw new BadRequestException({
        message: 'You cannot follow yourself',
      });
    }

    if (followerIndex > -1) {
      targetProfile.followers.splice(followerIndex, 1);
      await this.userRepository.save(targetProfile);
    }

    return {
      profile: { ...targetProfile, followers: undefined, isFollowed: false },
    };
  }

  async getFollowersOf(targetUserId: number) {
    const followersQuery = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.followers', 'followers')
      .loadRelationCountAndMap(
        'followers.followerCount',
        'followers.followers',
        'followerCount',
      )
      .where('user.id = :targetUserId', { targetUserId });

    const { followers } = await followersQuery.getOne();
    return { followers };
  }

  async getFollowingsOf(targetUserId: number) {
    const followingQuery = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.following', 'following')
      .loadRelationCountAndMap(
        'following.followerCount',
        'following.followers',
        'followerCount',
      )
      .where('user.id = :targetUserId', { targetUserId });

    const { following } = await followingQuery.getOne();
    return { following };
  }

  // fix later
  async amIFollowingSomeonesFollowing(targetUserId: number, myUserId: number) {
    const followingQuery = this.userRepository
      .createQueryBuilder('targetUser')
      .select('followers.id as otherid')
      .innerJoin('targetUser.followers', 'followers')
      .where('targetUser.id = :targetUserId', { targetUserId });

    const myFollowingQuery = this.userRepository
      .createQueryBuilder('myUser')
      .select('following.id as myid')
      .innerJoin('myUser.following', 'following')
      .where('myUser.id = :myUserId', { myUserId });

    const myFollowing = await myFollowingQuery.getRawMany();

    const commons = await followingQuery.getRawMany();
    return { myFollowing };
  }

  async getFollowRecommendations(userId: number) {
    const query = this.userRepository
      .createQueryBuilder('users')
      .leftJoin('users.followers', 'followers')
      .select([
        'users.id as id',
        'users.name as name',
        'users.handle as handle',
        'users.bio as bio',
        'users.avatar as avatar',
      ])
      .addSelect('COUNT(followers.id) as followerCount')
      .where('followers.id != :userId', { userId })
      .groupBy('users.id')
      .orderBy('followerCount', 'DESC')
      .limit(3);

    // const recs = await this.userRepository.find({
    //   where: { followers: { id: Not(userId) } },
    //   relations: {followers: {}}
    // });

    const recommendations = await query.getRawMany();
    return { recommendations };
  }
}
