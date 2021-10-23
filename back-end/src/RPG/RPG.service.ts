import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '@lprisma/prisma.service';
import { UserDTO } from '@user/dto/user.dto';
import { JwtPayload, LoginDTO } from '@auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: User): Promise<UserDTO> {
    //  o padrão SALT de enriquecimento da senha
    data.password = this.passwordEnrich(data.password, data.email);
    const user = await this.prisma.user.create({ data });
    return new UserDTO(
      user.id,
      user.name,
      user.email,
      user.role,
      user.createdOn,
      user.updateOn,
    );
  }

  async update(data: User): Promise<UserDTO> {
    const dbUser = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    if (dbUser.password !== data.password) {
      data.password = this.passwordEnrich(data.password, data.email);
    }

    const user = await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });

    return this.toUserDTO(user);
  }

  async delete(id: number): Promise<UserDTO> {
    const user = await this.prisma.user.delete({ where: { id: id } });
    return this.toUserDTO(user);
  }

  async findAll(): Promise<UserDTO[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.toUserDTO(user));
  }

  async findById(id: number): Promise<UserDTO> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    return this.toUserDTO(user);
  }

  async findByPayload(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    return this.toUserDTO(user);
  }

  async findByLogin(loginDTO: LoginDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDTO.email },
    });
    if (!user) {
      throw new HttpException(
        'Senha ou usuário inválido',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const areEqual = bcrypt.compareSync(
      `${loginDTO.password}_${loginDTO.email}`,
      user.password,
    );

    if (!areEqual) {
      throw new HttpException(
        'Senha ou usuário inválido',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.toUserDTO(user);
  }

  passwordEnrich(password: string, salt: string) {
    //  o padrão SALT de enriquecimento da senha
    const newPassword = `${password}_${salt}`;
    return bcrypt.hashSync(newPassword, 10);
  }

  toUserDTO(user: User): UserDTO {
    return new UserDTO(
      user.id,
      user.name,
      user.email,
      user.role,
      user.createdOn,
      user.updateOn,
    );
  }
}
