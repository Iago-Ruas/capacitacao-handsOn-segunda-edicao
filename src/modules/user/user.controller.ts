import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser({ id });
  }
  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    const hashPwd = await bcrypt.hash(userData.pwd, 10);
    const encryptedUserData = {
      name: userData.name,
      email: userData.email,
      pwd: hashPwd,
    };

    return this.userService.createUser(encryptedUserData);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userUpdateData: Prisma.UserUpdateInput,
  ) {
    return this.userService.updateUser(id, userUpdateData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
