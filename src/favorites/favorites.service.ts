import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { AlbumsService } from '../albums';
import { ArtistService } from '../artists';
import { TrackService } from '../tracks';
import { Favorites } from './interfaces';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,

    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  public async findAll() {
    const albums = await Promise.all(
      this.favorites.albums.map((id) => this.albumsService.findById(id)),
    );

    const artists = await Promise.all(
      this.favorites.artists.map((id) => this.artistService.findById(id)),
    );

    const tracks = await Promise.all(
      this.favorites.tracks.map((id) => this.trackService.findById(id)),
    );

    return {
      albums,
      artists,
      tracks,
    };
  }

  public async addAlbum(id: string): Promise<void> {
    return this.albumsService
      .findById(id)
      .then(({ id }) => {
        const alreadyExist = this.favorites.albums.some(
          (albumId) => albumId === id,
        );

        if (!alreadyExist) this.favorites.albums.push(id);
      })
      .catch(() => {
        throw new UnprocessableEntityException();
      });
  }

  public async addArtist(id: string): Promise<void> {
    return this.artistService
      .findById(id)
      .then(({ id }) => {
        const alreadyExist = this.favorites.artists.some(
          (artistId) => artistId === id,
        );

        if (!alreadyExist) this.favorites.artists.push(id);
      })
      .catch(() => {
        throw new UnprocessableEntityException();
      });
  }

  public async addTrack(id: string): Promise<void> {
    return this.trackService
      .findById(id)
      .then(({ id }) => {
        const alreadyExist = this.favorites.tracks.some(
          (trackId) => trackId === id,
        );

        if (!alreadyExist) this.favorites.tracks.push(id);
      })
      .catch(() => {
        throw new UnprocessableEntityException();
      });
  }

  public async removeAlbum(id: string): Promise<void> {
    const isExist = Boolean(
      this.favorites.albums.find((albumId) => albumId === id),
    );

    if (!isExist)
      throw new HttpException(
        'Album is not in favorites',
        HttpStatus.NOT_FOUND,
      );

    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => id !== albumId,
    );
  }

  public async removeArtist(id: string): Promise<void> {
    const isExist = Boolean(
      this.favorites.artists.find((artistId) => artistId === id),
    );

    if (!isExist)
      throw new HttpException(
        'Artist is not in favorites',
        HttpStatus.NOT_FOUND,
      );

    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => id !== artistId,
    );
  }

  public async removeTrack(id: string): Promise<void> {
    const isExist = Boolean(
      this.favorites.tracks.find((trackId) => trackId === id),
    );

    if (!isExist)
      throw new HttpException(
        'Track is not in favorites',
        HttpStatus.NOT_FOUND,
      );

    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => id !== trackId,
    );
  }
}
