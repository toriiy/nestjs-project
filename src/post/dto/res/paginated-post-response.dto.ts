import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../../common/interface/paginated-response.dto';
import { Post } from '../../../database/entities/post.entity';

export class PaginatedPostResponseDto extends PaginatedResponseDto {
  @ApiProperty({ isArray: true })
  entities: Post[];
}
