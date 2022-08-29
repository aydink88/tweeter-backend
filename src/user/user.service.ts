import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserEntity } from 'src/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import * as argon2 from 'argon2';
import { User } from './user.interface';
import paginate from 'src/shared/paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    // check uniqueness of username/email
    const { name, handle, email, password } = dto;
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.handle = :handle', { handle })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = { handle: 'handle and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new UserEntity();
    newUser.name = name;
    newUser.handle = handle;
    newUser.email = email;
    newUser.password = password;

    const savedUser = await this.userRepository.save(newUser);
    return this.buildUserObject(savedUser);
  }

  async findByCredentials({ email, password }: LoginUserDto): Promise<User> {
    console.log(email, password);
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'handle', 'email', 'bio', 'avatar', 'password'],
    });
    if (!user) {
      return null;
    }
    console.log(user);
    const passwordMatches = await argon2.verify(user.password, password);

    if (passwordMatches) {
      return this.buildUserObject(user);
    }

    return null;
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async findUserByHandleWithTweets(handle: string) {
    const user = await this.userRepository.find({
      where: { handle },
      relations: ['tweets'],
      select: ['id', 'handle', 'bio', 'avatar', 'tweets'],
    });
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return this.userRepository.remove(user);
  }

  async findUsers(options?: {
    searchTerm: string;
    page: number;
    limit: number;
  }) {
    const { searchTerm = '', page = 1, limit = 20 } = options;
    let qb = paginate(
      this.userRepository
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
        .groupBy('users.id')
        .orderBy('followerCount', 'DESC'),
      { page, limit, applyToResults: true },
    );

    if (searchTerm) {
      qb = qb
        .where('users.handle like :searchTerm', {
          searchTerm: '%' + searchTerm + '%',
        })
        .orWhere('users.name like :searchTerm2', {
          searchTerm2: '%' + searchTerm + '%',
        });
    }
    const people = await qb.getRawMany();
    return { people };
  }

  private buildUserObject(user: UserEntity): User {
    return {
      id: user.id,
      handle: user.handle,
      avatar: user.avatar,
      token: this.generateJWT(user),
      email: user.email,
      bio: user.bio,
    };
  }

  public generateJWT(user: UserEntity) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        handle: user.handle,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }
}
