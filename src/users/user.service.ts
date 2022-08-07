import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { omit } from 'lodash';

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

    return users.map((user) => omit(user, 'password'));
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundById('User', id);

    return omit(user, 'password');
  }

  public async create(input: CreteUserDto): Promise<User> {
    if (!input.login || !input.password) throw new BadRequestException();

    const createdUser = this.userRepository.create(input);

    await this.userRepository.save(createdUser);

    return omit(createdUser, 'password');
  }

  public async update(id: string, input: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) throw new NotFoundById('User', id);
    if (
      !input.newPassword ||
      !input.oldPassword ||
      input.newPassword === input.oldPassword
    )
      throw new BadRequestException();
    if (input.oldPassword !== updatedUser.password) new ForbiddenException();

    Object.assign(updatedUser, {
      ...omit(input, ['newPassword', 'oldPassword']),
      password: input.newPassword,
    });

    await this.userRepository.save(updatedUser);

    return omit(updatedUser, 'password');
  }

  public async deleteOne(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) throw new NotFoundById('User', id);
  }
}
