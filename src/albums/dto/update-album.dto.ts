import { PartialType } from '@nestjs/mapped-types';

import { CreteAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreteAlbumDto) {}
