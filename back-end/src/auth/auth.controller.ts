import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LoginDTO, LoginResponseDTO, JwtPayload } from '@auth/dto/login.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/')
  public async login(@Body() loginDTO: LoginDTO): Promise<LoginResponseDTO> {
    return await this.authService.login(loginDTO);
  }

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
