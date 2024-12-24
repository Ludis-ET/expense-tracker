import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [AuthModule, ExpensesModule],
  providers: [PrismaService],
})
export class AppModule {}
