import { Module } from '@nestjs/common';

import { AlbumsModule } from './albums';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artists';
import { TrackModule } from './tracks';

@Module({
  imports: [AlbumsModule, ArtistModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
