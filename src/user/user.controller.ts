import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete, UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  async createUser(@Body() data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.userService.createUser(data);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.findUser({ id });
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Body() data: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id },
      data,
    });
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }
}
