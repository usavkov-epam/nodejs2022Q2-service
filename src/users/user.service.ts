import { BadRequestException, Injectable } from '@nestjs/common';

import { Entity, Storage } from '../db';
import { CreteUserDto, UpdateUserDto } from './dto';
import { User } from './interfaces';

@Injectable()
export class UserService {
  @Entity<User>('user', { verbose: true })
  protected readonly db: Storage<User>;

  public async findAll(): Promise<User[]> {
    return this.db.findAll();
  }

  public async findById(id: string): Promise<User> {
    return this.db.findOne(id);
  }

  public async create(input: CreteUserDto): Promise<User> {
    if (Object.values(input).length < 1) throw new BadRequestException();
    return this.db.create(input);
  }

  public async update(id: string, input: UpdateUserDto): Promise<User> {
    if (Object.values(input).length < 1) throw new BadRequestException();
    return this.db.update(id, input);
  }

  public async deleteOne(id: string): Promise<void> {
    return this.db.deleteOne(id);
  }
}
