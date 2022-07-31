import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreteAlbumDto {
  @ApiProperty({ example: 'Sweat dreams', description: 'Name of the album' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1956, description: 'The year of the album' })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty({
    example: 'd07863fd-a107-4c3d-9ef7-d06106380fb2',
    description: 'ID of the related artist',
  })
  @IsOptional()
  @IsUUID(4)
  artistId: string | null;
}
