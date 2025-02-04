import { Post } from '../../../database/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PostsOfUserResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty({ isArray: true })
  posts: Post[];
}
