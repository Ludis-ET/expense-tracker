import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials);
  }

  @Post('register')
  register(@Body() user: { email: string; password: string; name: string }) {
    return this.authService.register(user);
  }
}
