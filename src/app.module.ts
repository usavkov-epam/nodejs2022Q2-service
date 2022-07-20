import { Module } from '@nestjs/common';

import { AlbumsModule } from './albums';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artists';
import { TrackModule } from './tracks';
import { UserModule } from './users';

@Module({
  imports: [AlbumsModule, ArtistModule, TrackModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
