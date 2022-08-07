import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AlbumEntity } from '../../albums/entities';
import { ArtistEntity } from '../../artists/entities';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  albumId: string | null;

  @Column({ nullable: true })
  artistId: string | null;

  @Exclude()
  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;

  @Exclude()
  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;
}
