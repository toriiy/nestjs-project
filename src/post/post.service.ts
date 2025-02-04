import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '../database/entities/post.entity';
import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';
import { PostResponseDto } from './dto/res/post-response.dto';
import { PostQueryDto } from './dto/query/post-query.validator';
import { PaginatedPostResponseDto } from './dto/res/paginated-post-response.dto';
import { PostsOfUserResponse } from './dto/res/posts-of-user-response';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostResponseDto> {
    try {
      return await this.postRepository.save(
        this.postRepository.create({
          ...createPostDto,
          userId: '55803b6a-c136-480c-ab81-8319e43a7b21',
        }),
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAllUserPosts(userId: string): Promise<PostsOfUserResponse> {
    try {
      const posts = await this.postRepository.find({ where: { userId } });
      if (!posts) {
        throw new BadRequestException('Incorrect userId');
      }
      return { userId, posts };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll(query: PostQueryDto): Promise<PaginatedPostResponseDto> {
    try {
      const options = {
        page: +query?.page || 1,
        limit: +query?.limit || 10,
        order: query?.order || 'ASC',
        sort: query?.sort || 'createdAt',
      };
      const [entities, total] = await this.postRepository.findAndCount({
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        order: { [options.sort]: options.order },
      });

      return {
        page: options.page,
        totalPages: Math.ceil(total / options.limit),
        totalItems: total,
        entities: entities,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: string): Promise<PostResponseDto> {
    try {
      return await this.postRepository.findOne({ where: { id } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    try {
      await this.postRepository.update(id, updatePostDto);
      return await this.postRepository.findOne({ where: { id } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.postRepository.delete(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
