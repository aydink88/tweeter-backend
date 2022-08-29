import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { User } from './decorators/user.decorator';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() userData: LoginUserDto) {
    const user = await this.userService.findByCredentials(userData);
    if (!user) {
      throw new BadRequestException({
        message: 'Wrong credentials or user does not exist',
      });
    }
    return { user };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@User('id') userId: number) {
    const user = await this.userService.findById(userId);
    return { user };
  }

  @Get('search')
  searchPeople(
    @Query('search') searchTerm: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.userService.findUsers({ searchTerm, page, limit });
  }

  @Get(':username/with-tweets')
  getUserWithTweets(@Param('username') username: string) {
    return this.userService.findUserByHandleWithTweets(username);
  }
}
