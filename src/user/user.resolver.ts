import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/jwt-auth-guard.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Public()
  @Mutation(() => User)
  async RegisterUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.registerUser(input);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => User, { nullable: true })
  async getUserByUsername(
    @Args('username') username: string,
  ): Promise<User | null> {
    return this.userService.findByUsername(username);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async GetAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
