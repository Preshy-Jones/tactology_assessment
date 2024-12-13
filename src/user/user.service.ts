import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(input: CreateUserInput): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { username: input.username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Create new user
    const user = this.userRepository.create(input);

    // Hash the password
    await user.hashPassword();

    // Save user
    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'username', 'createdAt'],
    });
  }
}
