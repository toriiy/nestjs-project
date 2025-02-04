import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SingInDto {
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
