import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesModule } from '../favorites';
import { TrackEntity } from './entities';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
