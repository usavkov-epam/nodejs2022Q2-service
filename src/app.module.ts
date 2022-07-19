import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
