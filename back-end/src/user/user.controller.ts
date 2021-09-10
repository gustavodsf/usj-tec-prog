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

import { UserDTO } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(@Res() res: Response): Response {
    const users = this.userService.findAll();
    return res.status(HttpStatus.OK).json({ payload: users });
  }

  @Get(':id')
  findById(@Param('id') id: number, @Res() res: Response): Response {
    const user = this.userService.findById(id);
    return res.status(HttpStatus.OK).json({ payload: user });
  }

  @Post()
  create(@Body() userDTO: UserDTO, @Res() res: Response): Response {
    const user = this.userService.create(userDTO);
    return res.status(HttpStatus.CREATED).json({ payload: user });
  }

  @Put()
  update(@Body() userDTO: UserDTO, @Res() res: Response): Response {
    const user = this.userService.update(userDTO);
    return res.status(HttpStatus.OK).json({ payload: user });
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() res: Response): Response {
    this.userService.delete(id);
    return res.status(HttpStatus.OK).send();
  }
}
