import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArtistEntity } from '../../artists/entities';
import { TrackEntity } from '../../tracks/entities';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @Exclude()
  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @Exclude()
  @OneToMany(() => TrackEntity, (track) => track.album, { cascade: true })
  tracks: TrackEntity[];
}
