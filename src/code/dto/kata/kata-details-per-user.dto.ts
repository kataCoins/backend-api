import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class KataDetailsPerUserDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  kataId: string;
}
