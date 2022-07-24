import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { AlbumsService } from './albums.service';
import { CreteAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './interfaces';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    return this.albumsService.findById(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreteAlbumDto): Promise<Album> {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.albumsService.deleteOne(id);
  }
}
