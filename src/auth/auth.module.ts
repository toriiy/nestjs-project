import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@webeleon/nestjs-redis';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { BearerStrategy } from './bearer.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../database/entities/user.entity';
import configuration from '../config/configuration';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => RedisModule.forFeature()),
    PassportModule.register({
      defaultStrategy: 'bearer',
      session: true,
    }),
    JwtModule.register({
      global: true,
      secret: configuration().token.accessTokenSecret,
      signOptions: { expiresIn: configuration().token.accessTokenExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
