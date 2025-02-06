import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { QueryDto } from '../../../common/validator/query.dto';

export class UserQueryDto extends QueryDto {
  @IsString()
  @IsOptional()
  @IsEnum([
    'username',
    'firstName',
    'age',
    'email',
    'createdAt',
    'updatedAt',
    'id',
  ])
  @ApiProperty({
    required: false,
    enum: [
      'username',
      'firstName',
      'age',
      'email',
      'createdAt',
      'updatedAt',
      'id',
    ],
  })
  sort?: string;
}
