import { PartialType } from '@nestjs/mapped-types';

import { CreteArtistmDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreteArtistmDto) {}
