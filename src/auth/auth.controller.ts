import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: { email: string; password: string }) {
    // Implement your sign-in logic here
    return this.authService.signin(body);
  }
}
