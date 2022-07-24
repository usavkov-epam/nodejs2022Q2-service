import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreteTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID(4)
  artistId: string | null;

  @IsOptional()
  @IsUUID(4)
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
