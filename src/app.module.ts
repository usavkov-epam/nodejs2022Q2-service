import { Module } from '@nestjs/common';

import { AlbumsModule } from './albums';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artists';
import { FavoritesModule } from './favorites';
import { TrackModule } from './tracks';
import { UserModule } from './users';

@Module({
  imports: [
    AlbumsModule,
    ArtistModule,
    FavoritesModule,
    TrackModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
