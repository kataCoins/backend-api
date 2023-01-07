import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class GetAllKataDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
