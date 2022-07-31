import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uniq } from 'lodash';

import { AlbumsService } from '../albums';
import { ArtistService } from '../artists';
import { TrackService } from '../tracks';
import { FavoritesEntity } from './entities';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,

    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,

    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
  ) {}

  public async findAllIds() {
    const ids = await this.favoritesRepository.findOne({ where: {} });

    return (
      ids ||
      ({
        albums: [],
        artists: [],
        tracks: [],
      } as FavoritesEntity)
    );
  }

  public async findAll() {
    const favorites = await this.findAllIds();

    if (favorites) {
      const albums = await Promise.all(
        favorites.albums.map((id) => this.albumsService.findById(id)),
      ).catch(() => []);

      const artists = await Promise.all(
        favorites.artists.map((id) => this.artistService.findById(id)),
      ).catch(() => []);

      const tracks = await Promise.all(
        favorites.tracks.map((id) => this.trackService.findById(id)),
      ).catch(() => []);

      return {
        albums,
        artists,
        tracks,
      };

      return {
        albums: [],
        artists: [],
        tracks: [],
      };
    }

    const createdFavorites = this.favoritesRepository.create({
      artists: [],
      albums: [],
      tracks: [],
    });
    return this.favoritesRepository.save(createdFavorites);
  }

  public async addAlbum(id: string): Promise<void> {
    return this.albumsService
      .findById(id)
      .then(async ({ id }) => {
        const favorites = await this.findAllIds();

        favorites.albums = uniq([...favorites.albums, id]);
        await this.favoritesRepository.save(favorites);
      })
      .catch(() => {
        throw new UnprocessableEntityException();
      });
  }

  public async addArtist(id: string): Promise<void> {
    return this.artistService
      .findById(id)
      .then(async ({ id }) => {
        const favorites = await this.findAllIds();

        favorites.artists = uniq([...favorites.artists, id]);
        await this.favoritesRepository.save(favorites);
      })
      .catch(() => {
        throw new UnprocessableEntityException();
      });
  }

  public async addTrack(id: string): Promise<void> {
    return this.trackService
      .findById(id)
      .then(async ({ id }) => {
        const favorites = await this.findAllIds();

        favorites.tracks = uniq([...favorites.tracks, id]);
        await this.favoritesRepository.save(favorites);
      })
      .catch(() => {
        throw new UnprocessableEntityException();
      });
  }

  public async removeAlbum(id: string): Promise<void> {
    const favorites = await this.findAllIds();
    const indx = favorites.albums.findIndex((albumId) => albumId === id);

    delete favorites.albums[indx];

    await this.favoritesRepository.save(favorites);
  }

  public async removeArtist(id: string): Promise<void> {
    const favorites = await this.findAllIds();
    const indx = favorites.artists.findIndex((artistId) => artistId === id);

    delete favorites.artists[indx];

    await this.favoritesRepository.save(favorites);
  }

  public async removeTrack(id: string): Promise<void> {
    const favorites = await this.findAllIds();
    const indx = favorites.tracks.findIndex((trackId) => trackId === id);

    delete favorites.tracks[indx];

    await this.favoritesRepository.save(favorites);
  }
}
