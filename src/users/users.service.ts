import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)private readonly userRepository: Repository<User>, ){}
 async create(createUserDto: CreateUserDto) {
    try{
      const user = await this.userRepository.create(createUserDto)
    
     return await this.userRepository.save(user)

    }
    catch(error){
      throw new(error)
    }
  }

  async findAll(page=1, limit=10) {
    const users = await this.userRepository.find({skip:(page-1)*limit, take:limit})

    return {users}
  }

 async findOne(username: string) :Promise<User | null>{
  return await this.userRepository.findOne({where:{username:username}, relations:['orders']}) 
  
  
  }

  async findOneByUsername(username: string) {
  const user = await this.userRepository.findOne({where:{username:username}, relations:['orders']}) 
  if (!user) {
    return{message:'this user is not found'}
  }
  return{user};
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
