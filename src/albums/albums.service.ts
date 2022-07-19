import { Injectable } from '@nestjs/common';

import { Entity, Storage } from '../db';
import { CreteAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './interfaces';

@Injectable()
export class AlbumsService {
  @Entity<Album>('album')
  protected readonly db: Storage<Album>;

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
    return this.db.deleteOne(id);
  }
}
