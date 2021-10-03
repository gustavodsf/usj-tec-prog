import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from '@auth/dto/login.dto';
import { UserDTO } from '@user/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDTO> {
    console.log(payload);
    const user = await this.authService.validateUser(payload);
    console.log(user);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
