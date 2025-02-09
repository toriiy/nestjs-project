import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../database/entities/user.entity';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserResponseDto } from './dto/res/user-response.dto';
import { PaginatedUserResponseDto } from './dto/res/paginated-user-response.dto';
import { UserQueryDto } from './dto/query/user-query.dto';
import { UserPresenter } from '../presenters/user.presenter';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userPresenter: UserPresenter,
  ) {}

  async findAll(query?: UserQueryDto): Promise<PaginatedUserResponseDto> {
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

      const [entities, total] = await this.userRepository.findAndCount({
        select: {
          id: true,
          username: true,
          firstName: true,
          age: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
        where: { [query?.searchField]: query?.searchValue },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        order: { [options.sort]: options.order },
        relations: {
          posts: true,
        },
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

  async findOneById(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException('Invalid id');
      }
      return this.userPresenter.toResponse(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOneByEmail(email: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new BadRequestException('Invalid email');
      }
      return this.userPresenter.toResponse(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      await this.userRepository.update(id, updateUserDto);
      const user = await this.userRepository.findOne({ where: { id } });
      return this.userPresenter.toResponse(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
