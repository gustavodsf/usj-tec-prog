import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  role: string;
  createdOn?: Date;
  updatedOn?: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    role: string,
    createdOn: Date,
    updatedOn: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }
}
