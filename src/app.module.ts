import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumsModule } from './albums';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artists';
import { FavoritesModule } from './favorites';
import { TrackModule } from './tracks';
import { UserModule } from './users';

import ormconfig from '../ormconfig';

@Module({
  imports: [
    AlbumsModule,
    ArtistModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    FavoritesModule,
    TrackModule,
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
