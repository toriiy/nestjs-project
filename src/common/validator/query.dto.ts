import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @ApiProperty({ required: false, default: 1 })
  page?: string;

  @IsOptional()
  @ApiProperty({ required: false, default: 10 })
  limit?: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  @ApiProperty({ required: false, enum: ['ASC', 'DESC'], default: 'ASC' })
  order: string;
}
