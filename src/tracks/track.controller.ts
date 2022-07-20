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

import { TrackService } from './track.service';
import { CreteTrackDto, UpdateTrackDto } from './dto';
import { Track } from './interfaces';

@Controller('track')
export class TrackController {
  constructor(private readonly albumsService: TrackService) {}

  @Get()
  findAll(): Promise<Track[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    return this.albumsService.findById(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreteTrackDto): Promise<Track> {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateTrackDto,
  ): Promise<Track> {
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
