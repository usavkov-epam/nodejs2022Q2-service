import { IsNotEmpty, IsString } from 'class-validator';

export class CreteUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
