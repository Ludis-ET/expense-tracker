import { LoginDto, RegisterDto } from './dto/auth.dto';
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

  async login(credentials: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: credentials.email },
    });
    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      const token = this.jwtService.sign({ userId: user.id });
      return { token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async register(user: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }
    const usernameExsist = await this.prisma.user.findUnique({
      where: { username: user.username },
    });

    if (usernameExsist) {
      throw new ConflictException('Username is already in use');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
  }
}
