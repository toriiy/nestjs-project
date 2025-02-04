import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserResponseDto } from './dto/res/user-response.dto';
import { PaginatedUserResponseDto } from './dto/res/paginated-user-response.dto';
import { UserQueryDto } from './dto/query/user-query.validator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.OK, type: PaginatedUserResponseDto })
  @Get('/list')
  async findAll(
    @Query() query?: UserQueryDto,
  ): Promise<PaginatedUserResponseDto> {
    return await this.userService.findAll(query);
  }

  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findOneById(id);
  }

  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @Get('email/:email')
  async findOneByEmail(
    @Param('email') email: string,
  ): Promise<UserResponseDto> {
    return await this.userService.findOneByEmail(email);
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
