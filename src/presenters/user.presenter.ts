import { Injectable } from '@nestjs/common';

import { User } from '../database/entities/user.entity';
import { UserResponseDto } from '../user/dto/res/user-response.dto';

@Injectable()
export class UserPresenter {
  toResponse(entity: User): UserResponseDto {
    return {
      id: entity.id,
      username: entity.username,
      firstName: entity.firstName,
      age: entity.age,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
