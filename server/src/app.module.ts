import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';
import { PrismaService } from 'prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, ExpensesModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
