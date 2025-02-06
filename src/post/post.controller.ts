import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
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

import { PostService } from './post.service';
import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';
import { PostResponseDto } from './dto/res/post-response.dto';
import { PostQueryDto } from './dto/query/post-query.dto';
import { PaginatedPostResponseDto } from './dto/res/paginated-post-response.dto';
import { RequestDto } from '../common/interface/request.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBadRequestResponse({ description: 'Invalid userId' })
  @ApiResponse({ status: HttpStatus.OK, type: PaginatedPostResponseDto })
  @Get('/user/:userId')
  findAllUserPosts(
    @Param('userId') userId: string,
    @Query() query?: PostQueryDto,
  ): Promise<PaginatedPostResponseDto> {
    return this.postService.findAllUserPosts(userId, query);
  }

  @ApiResponse({ status: HttpStatus.OK, type: PaginatedPostResponseDto })
  @Get('/list')
  findAll(@Query() query?: PostQueryDto): Promise<PaginatedPostResponseDto> {
    return this.postService.findAll(query);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard())
  @ApiResponse({ status: HttpStatus.CREATED, type: PostResponseDto })
  @HttpCode(201)
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: RequestDto,
  ): Promise<PostResponseDto> {
    return this.postService.create(createPostDto, req.user.id);
  }

  @ApiBadRequestResponse({ description: 'Invalid Id' })
  @ApiResponse({ status: HttpStatus.OK, type: PostResponseDto })
  @Get('/:id')
  findOne(@Param('id') id: string): Promise<PostResponseDto> {
    return this.postService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Post not found' })
  @UseGuards(AuthGuard())
  @ApiResponse({ status: HttpStatus.CREATED, type: PostResponseDto })
  @HttpCode(201)
  @Patch('/:id')
  update(
    @Req() req: RequestDto,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    return this.postService.update(id, updatePostDto, req.user.id);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Post not found' })
  @UseGuards(AuthGuard())
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(204)
  @Delete('/:id')
  remove(@Req() req: RequestDto, @Param('id') id: string): Promise<void> {
    return this.postService.remove(id, req.user.id);
  }
}
