import { PartialType } from '@nestjs/mapped-types';

import { CreteTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreteTrackDto) {}
