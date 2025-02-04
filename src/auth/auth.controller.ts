import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/req/create-user.dto';
import { UserResponseDto } from '../user/dto/res/user-response.dto';
import { SingInDto } from './dto/req/singIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponseDto })
  @HttpCode(201)
  @Post('sing-up')
  async singUp(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.authService.singUp(createUserDto);
  }

  @Post('sing-in')
  async singIn(@Body() singInDto: SingInDto) {
    return await this.authService.singIn(singInDto.email, singInDto.password);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(204)
  @Delete('sing-out')
  async singOut(): Promise<void> {
    return await this.authService.singOut();
  }
}
