import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-connection')
  async testConnection() {
    try {
      // Attempt to fetch users to verify connection
      const users = await this.prismaService.user.findMany();
      return {
        success: true,
        message: 'Connection to MongoDB successful!',
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to MongoDB',
        error: error.message,
      };
    }
  }
}
