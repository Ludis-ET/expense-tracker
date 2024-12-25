import { RegisterDto, LoginDto } from './dto/auth.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('register')
  register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }
}
