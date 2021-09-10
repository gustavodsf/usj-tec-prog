import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  private readonly users: UserDTO[] = [];

  create(user: UserDTO) {
    user.id = String(this.users.length + 1);
    this.users.push(user);
    return user;
  }

  findAll(): UserDTO[] {
    return this.users;
  }

  delete(id: number) {
    if (id > this.users.length) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Dont exist the informed id.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    this.users.splice(Number(id) - 1, 1);
    return;
  }
  update(userDTO: UserDTO) {
    const id = parseInt(userDTO.id) - 1;
    this.users[id] = userDTO;
    return userDTO;
  }
  findById(id: number) {
    if (id > this.users.length) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Dont exist the informed id.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.users[Number(id) - 1];
  }
}
