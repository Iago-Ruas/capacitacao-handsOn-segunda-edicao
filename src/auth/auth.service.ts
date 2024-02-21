import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as brcypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const validPass = await brcypt.compare(pass, user.password);

    if (!validPass) return null;

    return user;
  }

  async login(user: any) {
    const payload = { id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
