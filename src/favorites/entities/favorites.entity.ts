import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true })
  artists: string[];

  @Column('uuid', { array: true })
  albums: string[];

  @Column('uuid', { array: true })
  tracks: string[];
}
