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

import { Prisma } from '@prisma/client';
import { Response } from 'express';

import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get()
  async findAll() {
    return await this.userService.users({}); 
  }

  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.user({ id: +id }); 
  }
}
