import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { Users } from '../../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string , data: Object}> {
    return this.userService.createUser(createUserDto.username);
  }

  @Get('get-by-username')
  async getByUsername(@Query('username') username: string): Promise<Users> {
    return this.userService.findUserByUsername(username);
  }
}