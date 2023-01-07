import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ExecStepDto } from './exec-step.dto';
import { Type } from 'class-transformer';
import { ExecSettingsDto } from './exec-settings.dto';

export class ExecDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  request_id: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExecStepDto)
  steps: ExecStepDto[];

  @IsDefined()
  @ValidateNested()
  @Type(() => ExecSettingsDto)
  settings: ExecSettingsDto;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  files: string;
}
