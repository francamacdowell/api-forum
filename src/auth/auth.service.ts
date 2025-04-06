import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(params: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const user = await this.userService.findUser({ email: params.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordMAtch = await bcrypt.compare(params.password, user.password);
    if (!passwordMAtch) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
