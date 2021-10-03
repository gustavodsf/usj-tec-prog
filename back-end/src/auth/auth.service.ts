import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload, LoginDTO } from '@auth/dto/login.dto';
import { UserDTO } from '@user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO) {
    // find user in db
    const user = await this.userService.findByLogin(loginDTO);

    // generate and sign token
    const token = this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDTO> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('token inválido', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ email }: UserDTO): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: { email: string } = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
