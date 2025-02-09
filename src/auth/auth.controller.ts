import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
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

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/req/create-user.dto';
import { SingInDto } from './dto/req/singIn.dto';
import { RequestDto } from '../common/interface/request.dto';
import { TokenResponseDto } from './dto/res/token.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: TokenResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @HttpCode(201)
  @Post('sing-up')
  async singUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.singUp(createUserDto);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: TokenResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @HttpCode(201)
  @Post('sing-in')
  async singIn(@Body() singInDto: SingInDto): Promise<{ accessToken: string }> {
    return await this.authService.singIn(singInDto.email, singInDto.password);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(204)
  @Delete('sing-out')
  async singOut(@Req() req: RequestDto): Promise<void> {
    return await this.authService.singOut(req.user.id);
  }
}
