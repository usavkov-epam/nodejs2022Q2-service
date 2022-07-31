import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AlbumEntity } from '../../albums/entities';
import { TrackEntity } from '../../tracks/entities';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @Exclude()
  @OneToMany(() => AlbumEntity, (album) => album.artist, { cascade: true })
  albums: AlbumEntity[];

  @Exclude()
  @OneToMany(() => TrackEntity, (track) => track.artist, { cascade: true })
  tracks: TrackEntity[];
}
