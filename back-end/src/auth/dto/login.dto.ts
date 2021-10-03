import { isEmail, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}

export class LoginResponseDTO {
  @IsEmail()
  email: string;
  accessToken: string;
  expiresIn: number;
}

export class JwtPayload {
  @IsEmail()
  email: string;
}