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

  @IsOptional()
  @IsString()
  @IsEnum(['username', 'firstName', 'age', 'email', 'id'])
  @ApiProperty({
    required: false,
    description:
      'if you wanna search user by field you have to use both searchField and searchValue',
    enum: ['username', 'firstName', 'age', 'email', 'id'],
  })
  searchField?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description:
      'if you wanna search user by field you have to use both searchField and searchValue',
  })
  searchValue?: string;
}
