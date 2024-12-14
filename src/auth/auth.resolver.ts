import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from 'src/common/types/global';
import { Public } from 'src/common/decorators/jwt-auth-guard.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResponse)
  async Login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(username, password);
  }
}
