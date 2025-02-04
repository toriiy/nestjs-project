import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../../database/entities/user.entity';
import { PaginatedResponseDto } from '../../../common/interface/paginated-response.dto';

export class PaginatedUserResponseDto extends PaginatedResponseDto {
  @ApiProperty({ isArray: true })
  entities: User[];
}
