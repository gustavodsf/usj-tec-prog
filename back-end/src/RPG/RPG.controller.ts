import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    HttpException,
    HttpStatus,
    Body,
    Res,
    UseGuards,
  } from '@nestjs/common';
  
  import { Response } from 'express';
  import { UserService } from '@user/user.service';
  import { User } from '@prisma/client';
  import { JwtAuthGuard } from '@auth/jwt-auth.guard';
  import * as _ from 'lodash';
  
  @Controller('user')
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Get()
    @UseGuards(JwtAuthGuard)
    getAllUser() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getUserBuyId(@Param('id') id: number) {
      return this.userService
        .findById(id)
        .then((user) => {
          console.log(user);
          // se for  undefined retorna objeto vazio, resposta mais bonita
          return user || {};
        })
        .catch((err) => {
          throw new HttpException(
            'Erro! ao tentar retornar o usuário',
            HttpStatus.BAD_REQUEST,
          );
        });
    }
  
    @Post()
    createUser(@Body() user: User) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
        throw new HttpException(
          'Erro! o e-mail informado é inválido',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      return this.userService
        .save(user)
        .then((user) => {
          return user;
        })
        .catch((_) => {
          throw new HttpException(
            'Erro! ao tentar salvar o usuário',
            HttpStatus.BAD_REQUEST,
          );
        });
    }
  
    @Put()
    @UseGuards(JwtAuthGuard)
    updateUser(@Body() user: User) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
        throw new HttpException(
          'Erro! o e-mail informado é inválido',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      if (user.role != 'user' && user.role != 'admin') {
        throw new HttpException(
          'Erro! o perfil informado está errado',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      return this.userService
        .update(user)
        .then((user) => {
          return user;
        })
        .catch((_) => {
          throw new HttpException(
            'Erro! ao tentar atualizar o usuário',
            HttpStatus.BAD_REQUEST,
          );
        });
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Param('id') id: number, @Res() response: Response) {
      return this.userService
        .delete(id)
        .then(() => {
          return response.status(HttpStatus.OK).send();
        })
        .catch((_) => {
          return response
            .status(HttpStatus.BAD_REQUEST)
            .send('Erro! ao tentar excluir o usuário');
        });
    }
  }
  