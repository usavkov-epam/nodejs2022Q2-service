import { forwardRef, Module } from '@nestjs/common';

import { AlbumsModule } from '../albums';
import { FavoritesModule } from '../favorites';
import { TrackModule } from '../tracks';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
