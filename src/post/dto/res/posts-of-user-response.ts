import { ApiProperty } from '@nestjs/swagger';

import { Post } from '../../../database/entities/post.entity';

export class PostsOfUserResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty({ isArray: true })
  posts: Post[];
}
