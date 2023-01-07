import { CreateKataRunDto } from './create-kata-run.dto';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddKataRunToKataDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  kataId: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateKataRunDto)
  kataRun: CreateKataRunDto;
}
