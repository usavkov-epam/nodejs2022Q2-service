import { Injectable } from '@nestjs/common';

import { Entity, Storage } from '../db';
import { CreteArtistmDto, UpdateArtistDto } from './dto';
import { Artist } from './interfaces';

@Injectable()
export class ArtistService {
  @Entity<Artist>('artist')
  protected readonly db: Storage<Artist>;

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
    return this.db.deleteOne(id);
  }
}
