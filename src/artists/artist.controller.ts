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

import { ArtistService } from './artist.service';
import { CreteArtistmDto, UpdateArtistDto } from './dto';
import { Artist } from './interfaces';

@Controller('artist')
export class ArtistController {
  constructor(private readonly albumsService: ArtistService) {}

  @Get()
  findAll(): Promise<Artist[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    return this.albumsService.findById(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreteArtistmDto): Promise<Artist> {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateArtistDto,
  ): Promise<Artist> {
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
