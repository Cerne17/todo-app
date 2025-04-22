import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAllUsers();
  }

  @Post()
  async create(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: Partial<User>) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
