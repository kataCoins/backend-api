import { IsDate, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateKataEventDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  kataId: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsDate()
  startDate: Date;

  @IsDefined()
  @IsDate()
  endDate: Date;
}
