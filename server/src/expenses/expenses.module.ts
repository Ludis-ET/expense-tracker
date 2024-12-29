import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { PrismaService } from 'prisma/prisma.service';
import { ExpensesController } from './expenses.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ExpensesService, PrismaService],
  controllers: [ExpensesController],
  exports: [ExpensesService],
})
export class ExpensesModule {}
