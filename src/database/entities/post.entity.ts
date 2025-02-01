import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './date.entity';

@Entity()
export class Post extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  body: string;
}
