import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;
}
