import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.user.findMany({
      where: { id: userId },
    });
  }

  async findOne(id: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user || user.id !== userId) {
      throw new UnauthorizedException('Access denied');
    }

    return user;
  }
}
