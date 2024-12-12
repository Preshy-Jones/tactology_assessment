import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Login User')
  @UseGuards(StudentAuthGuard)
  @Post('login/student')
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  @ApiBody({
    type: LoginUserDto,
  })
  async loginUser(@Request() req) {
    return this.authService.loginUser(req.user);
  }
}
