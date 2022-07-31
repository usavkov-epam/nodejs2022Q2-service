import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesModule } from '../favorites';
import { TrackModule } from '../tracks';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entities';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
