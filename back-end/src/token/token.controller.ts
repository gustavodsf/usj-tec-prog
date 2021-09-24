import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Res,
  Body,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';

import { DataDTO } from './dto/data.dto';
import { TokenDTO } from './dto/token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post('/create')
  async createToken(@Body() dataDto: DataDTO, @Res() response: Response) {
    const token = this.tokenService.createToken(dataDto);
    console.log(token);
    return response.status(HttpStatus.CREATED).json({ token });
  }

  @Post('/verify')
  async findAll(@Body() tokenDTO: TokenDTO, @Res() response: Response) {
    return response
      .status(HttpStatus.CREATED)
      .json(this.tokenService.verifyToken(tokenDTO.token));
  }
}
