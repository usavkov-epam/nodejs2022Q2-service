import { Module } from '@nestjs/common';
import { AlbumsService } from 'src/albums';
import { ArtistService } from 'src/artists';
import { TrackService } from 'src/tracks';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, ArtistService, AlbumsService, TrackService],
  imports: [],
  exports: [FavoritesService],
})
export class FavoritesModule {}
