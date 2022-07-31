import { NotFoundException } from '@nestjs/common';

export class NotFoundById extends NotFoundException {
  constructor(entity: string, id: string) {
    super(`${entity} with id - "${id}" not found`);
  }
}
