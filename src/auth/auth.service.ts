import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../database/entities/user.entity';
import { CreateUserDto } from '../user/dto/req/create-user.dto';
import { UserResponseDto } from '../user/dto/res/user-response.dto';
import { SingInDto } from './dto/req/singIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async singUp(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const isEmailUnique = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (isEmailUnique) {
        throw new BadRequestException('Email must be unique');
      }

      const password = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.userRepository.save(
        this.userRepository.create({ ...createUserDto, password }),
      );

      return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        age: user.age,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async singIn(singInDto: SingInDto) {
    try {
      console.log(singInDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async singOut(): Promise<void> {
    try {
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
