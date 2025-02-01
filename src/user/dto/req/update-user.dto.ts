import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty({ minLength: 3, required: false })
  username?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty({ minLength: 3, required: false })
  firstName?: string;

  @IsNumber()
  @IsOptional()
  @Min(15)
  @Max(100)
  @ApiProperty({
    description: 'should be a number between 15 and 100',
    required: false,
  })
  age?: number;
}
