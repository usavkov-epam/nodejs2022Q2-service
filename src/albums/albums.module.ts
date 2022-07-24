import { forwardRef, Module } from '@nestjs/common';

import { FavoritesModule } from '../favorites';
import { TrackModule } from '../tracks';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [forwardRef(() => FavoritesModule), forwardRef(() => TrackModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
