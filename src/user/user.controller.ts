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
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserResponseDto } from './dto/res/user-response.dto';
import { PaginatedUserResponseDto } from './dto/res/paginated-user-response.dto';
import { UserQueryDto } from './dto/query/user-query.dto';
import { RequestDto } from '../common/interface/request.dto';

@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.OK, type: PaginatedUserResponseDto })
  @Get('/list')
  async findAll(
    @Query() query?: UserQueryDto,
  ): Promise<PaginatedUserResponseDto> {
    return await this.userService.findAll(query);
  }

  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findOneById(id);
  }

  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Invalid email' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @Get('email/:email')
  async findOneByEmail(
    @Param('email') email: string,
  ): Promise<UserResponseDto> {
    return await this.userService.findOneByEmail(email);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserResponseDto,
  })
  @HttpCode(201)
  @Patch('/me')
  async update(
    @Req() req: RequestDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(req.user.id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(204)
  @Delete('/me')
  async remove(@Req() req: RequestDto): Promise<void> {
    return await this.userService.remove(req.user.id);
  }
}
