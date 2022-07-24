import { PartialType } from '@nestjs/mapped-types';

import { CreteUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreteUserDto) {}
