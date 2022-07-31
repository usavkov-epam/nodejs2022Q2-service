import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @VersionColumn({ default: 1 })
  version: number;

  @Transform(({ value }) => Number(new Date(value)))
  @CreateDateColumn()
  createdAt: number;

  @Transform(({ value }) => Number(new Date(value)))
  @UpdateDateColumn()
  updatedAt: number;
}
