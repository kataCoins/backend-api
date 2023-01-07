import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { LanguageRun } from '../../interfaces/language-run.enum';

export class SaveKataAnswerDto {
  @IsDefined()
  @IsEnum(LanguageRun)
  language: LanguageRun;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  kataId: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  kataEventId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;
}
