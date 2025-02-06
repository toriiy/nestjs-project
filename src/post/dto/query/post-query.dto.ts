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
}
