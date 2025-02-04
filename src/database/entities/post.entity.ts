import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateEntity } from './date.entity';
import { User } from './user.entity';

@Entity()
export class Post extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  body: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (entity) => entity.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: User;
}
