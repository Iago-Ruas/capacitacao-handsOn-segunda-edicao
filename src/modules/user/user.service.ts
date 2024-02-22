import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const where: Prisma.UserWhereUniqueInput = { id };
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(id: string): Promise<User> {
    const where: Prisma.UserWhereUniqueInput = { id };
    return this.prisma.user.delete({
      where,
    });
  }
}
