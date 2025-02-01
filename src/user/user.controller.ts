import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { User } from '../database/entities/user.entity';
import { UserResponseDto } from './dto/res/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/list')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findOne(id);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponseDto })
  @HttpCode(201)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(204)
  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(id);
  }
}
