import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  registerUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }


  async findByEmail(email: string) {}



}
