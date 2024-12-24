import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { description: string; amount: number; userId: string }) {
    return this.prisma.expense.create({
      data,
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
