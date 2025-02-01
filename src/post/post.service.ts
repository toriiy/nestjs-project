import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '../database/entities/post.entity';
import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';
import { PostResponseDto } from './dto/res/post-response.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostResponseDto> {
    try {
      return await this.postRepository.save(
        this.postRepository.create(createPostDto),
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll(): Promise<PostResponseDto[]> {
    try {
      return await this.postRepository.find();
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
