import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreteArtistmDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
