import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumsService {
  getHello(): string {
    return 'Hello World!';
  }
}
