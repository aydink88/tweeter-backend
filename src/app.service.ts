import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
  getHello() {
    return this.userService.findAll();
  }
}
