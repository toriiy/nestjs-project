import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  firstName: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(15)
  @Max(100)
  @ApiProperty({ description: 'should be a number between 15 and 100' })
  age: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  @Transform(({ value }) => value.trim())
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  @ApiProperty({
    description: 'minimum eight characters, at least one letter and one number',
  })
  password: string;
}
