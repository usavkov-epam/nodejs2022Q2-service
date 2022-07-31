import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FavoritesService } from '../favorites';
import { NotFoundById } from '../helpers';
import { TrackService } from '../tracks';
import { CreteAlbumDto, UpdateAlbumDto } from './dto';
import { AlbumEntity } from './entities';
import { Album } from './interfaces';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,

    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  public async findAll(): Promise<Album[]> {
    const albums = await this.albumRepository.find();

    return albums;
  }

  public async findById(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) throw new NotFoundById('Album', id);

    return album;
  }

  public async create(input: CreteAlbumDto): Promise<Album> {
    const createdAlbum = this.albumRepository.create(input);

    return this.albumRepository.save(createdAlbum);
  }

  public async update(id: string, input: UpdateAlbumDto): Promise<Album> {
    const updatedAlbum = await this.albumRepository.findOne({ where: { id } });

    if (!updatedAlbum) throw new NotFoundById('Album', id);

    Object.assign(updatedAlbum, input);

    return this.albumRepository.save(updatedAlbum);
  }

  public async deleteOne(id: string): Promise<void> {
    const result = await this.albumRepository.delete(id);

    if (result.affected === 0) throw new NotFoundById('Album', id);

    const tracks = await this.trackService
      .findAll()
      .then((_tracks) => _tracks.filter(({ albumId }) => id === albumId));

    await Promise.all(
      tracks.map(
        async (track) =>
          await this.trackService.update(track.id, { albumId: null }),
      ),
    );

    await this.favoritesService.removeAlbum(id);
  }
}
