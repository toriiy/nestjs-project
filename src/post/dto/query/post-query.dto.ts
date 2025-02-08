import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { QueryDto } from '../../../common/validator/query.dto';

export class PostQueryDto extends QueryDto {
  @IsString()
  @IsOptional()
  @IsEnum(['title', 'createdAt', 'updatedAt', 'userId', 'id'])
  @ApiProperty({
    required: false,
    enum: ['title', 'createdAt', 'updatedAt', 'userId', 'id'],
  })
  sort?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['title', 'body', 'description', 'id', 'userId'])
  @ApiProperty({
    required: false,
    description:
      'if you wanna search post by field you have to use both searchField and searchValue',
    enum: ['title', 'body', 'description', 'id', 'userId'],
  })
  searchField?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description:
      'if you wanna search post by field you have to use both searchField and searchValue',
  })
  searchValue?: string;
}
