import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '../database/entities/post.entity';
import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';
import { PostResponseDto } from './dto/res/post-response.dto';
import { PostQueryDto } from './dto/query/post-query.dto';
import { PaginatedPostResponseDto } from './dto/res/paginated-post-response.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAllUserPosts(
    userId: string,
    query: PostQueryDto,
  ): Promise<PaginatedPostResponseDto> {
    try {
      if (!userId) {
        throw new BadRequestException('Invalid userId');
      }

      const options = {
        page: +query?.page || 1,
        limit: +query?.limit || 10,
        order: query?.order || 'ASC',
        sort: query?.sort || 'createdAt',
      };

      if (
        (query?.searchValue && !query?.searchField) ||
        (!query?.searchValue && query?.searchField)
      ) {
        throw new BadRequestException(
          'to search item by field you have to use both searchField and searchValue',
        );
      }

      const [entities, total] = await this.postRepository.findAndCount({
        where: { userId, [query?.searchField]: query?.searchValue },
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

  async findAll(query: PostQueryDto): Promise<PaginatedPostResponseDto> {
    try {
      const options = {
        page: +query?.page || 1,
        limit: +query?.limit || 10,
        order: query?.order || 'ASC',
        sort: query?.sort || 'createdAt',
      };

      if (
        (query?.searchValue && !query?.searchField) ||
        (!query?.searchValue && query?.searchField)
      ) {
        throw new BadRequestException(
          'To search item by field you have to use both searchField and searchValue',
        );
      }

      const [entities, total] = await this.postRepository.findAndCount({
        where: { [query?.searchField]: query?.searchValue },
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

  async create(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<PostResponseDto> {
    try {
      return await this.postRepository.save(
        this.postRepository.create({
          ...createPostDto,
          userId,
        }),
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: string): Promise<PostResponseDto> {
    try {
      if (!id) {
        throw new BadRequestException('Invalid Id');
      }
      const post = await this.postRepository.findOne({ where: { id } });

      if (!post) {
        throw new BadRequestException('Invalid Id');
      }

      return post;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    userId: string,
  ): Promise<PostResponseDto> {
    try {
      const post = await this.postRepository.findOne({ where: { id, userId } });
      if (!post) {
        throw new BadRequestException('Post not found');
      }
      await this.postRepository.update(id, updatePostDto);
      return await this.postRepository.findOne({ where: { id } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: string, userId: string): Promise<void> {
    try {
      const post = await this.postRepository.findOne({ where: { id, userId } });
      if (!post) {
        throw new BadRequestException('Post not found');
      }
      await this.postRepository.delete(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
