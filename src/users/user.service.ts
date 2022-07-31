import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundById } from '../helpers';
import { CreteUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entities';
import { User } from './interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundById('User', id);

    return user;
  }

  public async create(input: CreteUserDto): Promise<User> {
    if (!input.login || !input.password) throw new BadRequestException();

    const createdUser = this.userRepository.create(input);

    return this.userRepository.save(createdUser);
  }

  public async update(id: string, input: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) throw new NotFoundById('User', id);
    if (input.password === updatedUser.password)
      throw new BadRequestException();

    Object.assign(updatedUser, input);

    return this.userRepository.save(updatedUser);
  }

  public async deleteOne(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) throw new NotFoundById('User', id);
  }
}
