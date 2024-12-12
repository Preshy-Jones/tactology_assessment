import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async loginUser(data: any) {
    try {
      const { user } = data;
      const payload = {
        email: user.email,
        sub: user.id,
        role,
      };

      return {
        message: 'Login successful',
        data: {
          user,
          token: this.jwtService.sign(payload),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const data = await this.userService.findByEmail(email);
      if (!data) {
        return null;
      }
      const { user, role } = data;

      if (user && (await bcrypt.compare(password, user.password))) {
        return {
          user,
          role,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
