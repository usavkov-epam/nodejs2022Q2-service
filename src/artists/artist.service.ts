import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { AlbumsService } from '../albums';
import { Entity, Storage } from '../db';
import { FavoritesService } from '../favorites';
import { TrackService } from '../tracks';
import { CreteArtistmDto, UpdateArtistDto } from './dto';
import { Artist } from './interfaces';

@Injectable()
export class ArtistService {
  @Entity<Artist>('artist')
  protected readonly db: Storage<Artist>;

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumService: AlbumsService,

    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  public async findAll(): Promise<Artist[]> {
    return this.db.findAll();
  }

  public async findById(id: string): Promise<Artist> {
    return this.db.findOne(id);
  }

  public async create(input: CreteArtistmDto): Promise<Artist> {
    return this.db.create(input);
  }

  public async update(id: string, input: UpdateArtistDto): Promise<Artist> {
    return this.db.update(id, input);
  }

  public async deleteOne(id: string): Promise<void> {
    return this.db.deleteOne(id).then(async () => {
      const albums = await this.albumService
        .findAll()
        .then((_albums) => _albums.filter(({ artistId }) => id === artistId));

      const tracks = await this.trackService
        .findAll()
        .then((_tracks) => _tracks.filter(({ artistId }) => id === artistId));

      await Promise.all(
        albums.map((album) =>
          this.albumService.update(album.id, { artistId: null }),
        ),
      ).catch((e) => console.log(e));

      await Promise.all(
        tracks.map((track) =>
          this.trackService.update(track.id, { artistId: null }),
        ),
      ).catch((e) => console.log(e));

      await this.favoritesService.removeArtist(id).catch((e) => console.log(e));
    });
  }
}
