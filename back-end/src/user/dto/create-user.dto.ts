export class CreateUserDto {
    id: number;
    name: string;
    email: string;
    role: string;
    createdOn?: Date;
    updatedOn?: Date;
}
