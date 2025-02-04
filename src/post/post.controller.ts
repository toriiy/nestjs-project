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
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';
import { PostResponseDto } from './dto/res/post-response.dto';
import { PostQueryDto } from './dto/query/post-query.validator';
import { PaginatedPostResponseDto } from './dto/res/paginated-post-response.dto';
import { PostsOfUserResponse } from './dto/res/posts-of-user-response';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: PostResponseDto })
  @HttpCode(201)
  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostResponseDto> {
    return this.postService.create(createPostDto);
  }

  @ApiResponse({ status: HttpStatus.OK, type: PostsOfUserResponse })
  @Get('/user/:userId')
  findAllUserPosts(
    @Param('userId') userId: string,
  ): Promise<PostsOfUserResponse> {
    return this.postService.findAllUserPosts(userId);
  }

  @ApiResponse({ status: HttpStatus.OK, type: PaginatedPostResponseDto })
  @Get('/list')
  findAll(@Query() query?: PostQueryDto): Promise<PaginatedPostResponseDto> {
    return this.postService.findAll(query);
  }

  @ApiResponse({ status: HttpStatus.OK, type: PostResponseDto })
  @Get('/:id')
  findOne(@Param('id') id: string): Promise<PostResponseDto> {
    return this.postService.findOne(id);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: PostResponseDto })
  @HttpCode(201)
  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    return this.postService.update(id, updatePostDto);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(204)
  @Delete('/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(id);
  }
}
