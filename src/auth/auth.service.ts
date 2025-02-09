import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { JwtService } from '@nestjs/jwt';

import { User } from '../database/entities/user.entity';
import { CreateUserDto } from '../user/dto/req/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userId: string): Promise<User> {
    try {
      if (!userEmail || !userId) {
        throw new UnauthorizedException();
      }

      const user = await this.userRepository.findOne({
        where: { id: userId, email: userEmail },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createToken(userId: string, userEmail: string): Promise<string> {
    return this.jwtService.sign({ id: userId, email: userEmail });
  }

  async singUp(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
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

      if (!user) {
        throw new BadRequestException();
      }

      const token = await this.createToken(user.id, user.email);

      await this.redisClient.setEx(
        `user-token-${user.id}`,
        2 * 24 * 60 * 60,
        token,
      );

      return { accessToken: token };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async singIn(
    userEmail: string,
    userPassword: string,
  ): Promise<{ accessToken: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        throw new BadRequestException('Incorrect email or password');
      }

      const isPasswordCorrect = await bcrypt.compare(
        userPassword,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new BadRequestException('Incorrect password');
      }

      const token = await this.createToken(user.id, user.email);

      await this.redisClient.setEx(
        `user-token-${user.id}`,
        2 * 24 * 60 * 60,
        token,
      );
      return { accessToken: token };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async singOut(userId: string): Promise<void> {
    try {
      await this.redisClient.del(`user-token-${userId}`);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
