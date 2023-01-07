import { KataRunSettingsDto } from '../kata-run-settings.dto';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateKataRunDto } from '../kata-run/create-kata-run.dto';

export class CreateKataDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => KataRunSettingsDto)
  settings: KataRunSettingsDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKataRunDto)
  kataRuns?: [CreateKataRunDto];
}
