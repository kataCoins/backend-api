import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class KataEventIdDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  kataEventId: string;
}
