import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: credentials.email },
    });
    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      const token = this.jwtService.sign({ userId: user.id });
      return { token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async register(user: {
    email: string;
    password: string;
    name: string;
    username: string;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
  }
}
