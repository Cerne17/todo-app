import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(email: string, pw: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);

    if (user?.password !== pw) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    // TODO: Generate JWT token here

    return result;
  }
}
