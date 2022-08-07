import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FavoritesService } from '../favorites';
import { NotFoundById } from '../helpers';
import { CreteTrackDto, UpdateTrackDto } from './dto';
import { TrackEntity } from './entities';
import { Track } from './interfaces';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,

    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  public async findAll(): Promise<Track[]> {
    const tracks = await this.trackRepository.find();

    return tracks;
  }

  public async findById(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) throw new NotFoundById('Track', id);

    return track;
  }

  public async create(input: CreteTrackDto): Promise<Track> {
    const createdTrack = this.trackRepository.create(input);

    return this.trackRepository.save(createdTrack);
  }

  public async update(id: string, input: UpdateTrackDto): Promise<Track> {
    const updatedTrack = await this.trackRepository.findOne({ where: { id } });

    if (!updatedTrack) throw new NotFoundById('Track', id);

    Object.assign(updatedTrack, input);

    return this.trackRepository.save(updatedTrack);
  }

  public async deleteOne(id: string): Promise<void> {
    const result = await this.trackRepository.delete(id);

    if (result.affected === 0) throw new NotFoundById('Track', id);
  }
}
