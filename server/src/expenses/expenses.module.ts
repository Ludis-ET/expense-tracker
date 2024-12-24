import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ExpensesService],
  exports: [ExpensesService],
})
export class ExpensesModule {}
