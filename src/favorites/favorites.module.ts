import { forwardRef, Module } from '@nestjs/common';

import { AlbumsModule } from '../albums';
import { ArtistModule } from '../artists';
import { TrackModule } from '../tracks';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
