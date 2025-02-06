import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DateEntity } from './date.entity';
import { Post } from './post.entity';

@Entity()
export class User extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  username: string;

  @Column('text', { nullable: false })
  firstName: string;

  @Column('integer', { nullable: false })
  age: number;

  @Column('text', { nullable: false, unique: true })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @OneToMany(() => Post, (entity) => entity.user)
  posts?: Post[];
}
