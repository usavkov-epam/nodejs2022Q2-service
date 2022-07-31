import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumsModule } from '../albums';
import { ArtistModule } from '../artists';
import { TrackModule } from '../tracks';
import { FavoritesEntity } from './entities';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([FavoritesEntity]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
