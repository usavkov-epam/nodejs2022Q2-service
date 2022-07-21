import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Entity, Storage } from '../db';
import { FavoritesService } from '../favorites';
import { TrackService } from '../tracks';
import { CreteAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './interfaces';

@Injectable()
export class AlbumsService {
  @Entity<Album>('album')
  protected readonly db: Storage<Album>;

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  public async findAll(): Promise<Album[]> {
    return this.db.findAll();
  }

  public async findById(id: string): Promise<Album> {
    return this.db.findOne(id);
  }

  public async create(input: CreteAlbumDto): Promise<Album> {
    return this.db.create(input);
  }

  public async update(id: string, input: UpdateAlbumDto): Promise<Album> {
    return this.db.update(id, input);
  }

  public async deleteOne(id: string): Promise<void> {
    return this.db.deleteOne(id).then(async () => {
      const tracks = await this.trackService
        .findAll()
        .then((_tracks) => _tracks.filter(({ albumId }) => id === albumId));

      await Promise.all(
        tracks.map((track) =>
          this.trackService.update(track.id, { albumId: null }),
        ),
      ).catch((e) => console.log(e));

      await this.favoritesService.removeAlbum(id).catch((e) => console.log(e));
    });
  }
}
