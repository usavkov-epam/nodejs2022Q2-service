import { Controller, Get } from '@nestjs/common';

import { AlbumsService } from './albums.service';

@Controller()
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getHello(): string {
    return this.albumsService.getHello();
  }
}
