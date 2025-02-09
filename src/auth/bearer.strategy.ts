import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-http-bearer';
import { JwtService } from '@nestjs/jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import { AuthService } from './auth.service';
import { User } from '../database/entities/user.entity';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(token: string): Promise<User> {
    try {
      const payload = this.jwtService.decode(token);
      if (!(await this.redisClient.exists(`user-token-${payload?.id}`))) {
        throw new UnauthorizedException();
      }
      await this.jwtService.verifyAsync(token);

      const user = await this.authService.validateUser(
        payload.email,
        payload.id,
      );

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
