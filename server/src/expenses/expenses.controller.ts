import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(
    @Body()
    data: {
      title: string;
      amount: number;
      category: string;
    },
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.expensesService.create(data, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.userId;
    return this.expensesService.findAll(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.expensesService.remove(id, userId);
  }
}
