import { Injectable } from '@nestjs/common';

import { Entity, Storage } from '../db';
import { CreteTrackDto, UpdateTrackDto } from './dto';
import { Track } from './interfaces';

@Injectable()
export class TrackService {
  @Entity<Track>('track')
  protected readonly db: Storage<Track>;

  public async findAll(): Promise<Track[]> {
    return this.db.findAll();
  }

  public async findById(id: string): Promise<Track> {
    return this.db.findOne(id);
  }

  public async create(input: CreteTrackDto): Promise<Track> {
    return this.db.create(input);
  }

  public async update(id: string, input: UpdateTrackDto): Promise<Track> {
    return this.db.update(id, input);
  }

  public async deleteOne(id: string): Promise<void> {
    return this.db.deleteOne(id);
  }
}
