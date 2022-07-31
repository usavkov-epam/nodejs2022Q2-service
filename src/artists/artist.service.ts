import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlbumsService } from '../albums';
import { FavoritesService } from '../favorites';
import { NotFoundById } from '../helpers';
import { TrackService } from '../tracks';
import { CreteArtistmDto, UpdateArtistDto } from './dto';
import { ArtistEntity } from './entities';
import { Artist } from './interfaces';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumService: AlbumsService,

    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,

    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  public async findAll(): Promise<Artist[]> {
    const artists = await this.artistRepository.find();

    return artists;
  }

  public async findById(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) throw new NotFoundById('Artist', id);

    return artist;
  }

  public async create(input: CreteArtistmDto): Promise<Artist> {
    const createdArtist = this.artistRepository.create(input);

    return this.artistRepository.save(createdArtist);
  }

  public async update(id: string, input: UpdateArtistDto): Promise<Artist> {
    const updatedArtist = await this.artistRepository.findOne({
      where: { id },
    });

    if (!updatedArtist) throw new NotFoundById('Artist', id);

    Object.assign(updatedArtist, input);

    return this.artistRepository.save(updatedArtist);
  }

  public async deleteOne(id: string): Promise<void> {
    const result = await this.artistRepository.delete(id);

    if (result.affected === 0) throw new NotFoundById('Artist', id);

    // .then(async () => {
    //   const albums = await this.albumService
    //     .findAll()
    //     .then((_albums) => _albums.filter(({ artistId }) => id === artistId));

    //   const tracks = await this.trackService
    //     .findAll()
    //     .then((_tracks) => _tracks.filter(({ artistId }) => id === artistId));

    //   await Promise.all(
    //     albums.map((album) =>
    //       this.albumService.update(album.id, { artistId: null }),
    //     ),
    //   ).catch(() => console.log());

    //   await Promise.all(
    //     tracks.map((track) =>
    //       this.trackService.update(track.id, { artistId: null }),
    //     ),
    //   ).catch(() => console.log());

    //   await this.favoritesService.removeArtist(id).catch(() => console.log());
    // });
  }
}
