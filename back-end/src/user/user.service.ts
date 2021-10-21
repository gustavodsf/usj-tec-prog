import { LoginResponseDTO } from '@auth/dto/login.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user=new this.userModel(createUserDto);
    return user.save();
    //return 'Esta ação adiciona um novo usuário';
  }

  findAll() {
    return this.userModel.find();
    //return `Esta ação retorna todos os usuários`;
  }

  findOne(id:number) {
    return this.userModel.findById(id);
    //return `Esta ação retorna o usuário com id #${id}`;
  }

  update(id:number,updateUserDto:UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(
        {
          _id:id,
        },
        {
          $set:updateUserDto,
        },
        {
          new:true,
        },
      )
      .exec();
    
    //return `Esta ação atualiza o usuário com id #${id}`;
  }

  remove(id:number) {
    return this.userModel.deleteOne({_id:id}).exec();
    //return `Esta ação remove o usuário com id #${id}`;
  }
}
