import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    title: string;
    amount: number;
    category: string;
    userId: string;
  }) {
    return this.prisma.expense.create({
      data: {
        ...data,
        userId: data.userId,
      },
    });
  }

  async findAll() {
    return this.prisma.expense.findMany();
  }

  async remove(id: string) {
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
