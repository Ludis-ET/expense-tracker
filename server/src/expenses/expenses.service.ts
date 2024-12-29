import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: { title: string; amount: number; category: string },
    userId: string,
  ) {
    return this.prisma.expense.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.expense.findMany({
      where: { userId },
    });
  }

  async remove(id: string, userId: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense || expense.userId !== userId) {
      throw new UnauthorizedException('Access denied');
    }

    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
