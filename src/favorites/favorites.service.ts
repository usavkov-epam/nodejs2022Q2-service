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
    return this.favoritesRepository.findOne({ where: {} });
  }

  public async findAll() {
    const favorites = await this.findAllIds();

    if (favorites) {
      const albums = await Promise.all(
        favorites.albums.map((id) => this.albumsService.findById(id)),
      );

      const artists = await Promise.all(
        favorites.artists.map((id) => this.artistService.findById(id)),
      );

      const tracks = await Promise.all(
        favorites.tracks.map((id) => this.trackService.findById(id)),
      );

      return {
        albums,
        artists,
        tracks,
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
        const alreadyExist = favorites.albums.includes(id);

        if (!alreadyExist) {
          favorites.albums.push(id);
          await this.favoritesRepository.save(favorites);
        }
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
        const alreadyExist = favorites.artists.includes(id);

        if (!alreadyExist) {
          favorites.artists.push(id);
          await this.favoritesRepository.save(favorites);
        }
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
        const alreadyExist = favorites.tracks.includes(id);

        if (!alreadyExist) {
          favorites.tracks.push(id);
          await this.favoritesRepository.save(favorites);
        }
      })
      .catch(() => {
        throw new UnprocessableEntityException();
      });
  }

  public async removeAlbum(id: string): Promise<void> {
    const favorites = await this.findAllIds();
    const isExist = favorites.albums.includes(id);

    if (!isExist)
      throw new HttpException(
        'Album is not in favorites',
        HttpStatus.NOT_FOUND,
      );

    const indx = favorites.albums.findIndex((albumId) => albumId === id);

    delete favorites.albums[indx];

    await this.favoritesRepository.save(favorites);
  }

  public async removeArtist(id: string): Promise<void> {
    const favorites = await this.findAllIds();
    const isExist = favorites.artists.includes(id);

    if (!isExist)
      throw new HttpException(
        'Artist is not in favorites',
        HttpStatus.NOT_FOUND,
      );

    const indx = favorites.artists.findIndex((artistId) => artistId === id);

    delete favorites.artists[indx];

    await this.favoritesRepository.save(favorites);
  }

  public async removeTrack(id: string): Promise<void> {
    const favorites = await this.findAllIds();
    const isExist = favorites.tracks.includes(id);

    if (!isExist)
      throw new HttpException(
        'Track is not in favorites',
        HttpStatus.NOT_FOUND,
      );

    const indx = favorites.tracks.findIndex((trackId) => trackId === id);

    delete favorites.tracks[indx];

    await this.favoritesRepository.save(favorites);
  }
}
