import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LanguageRun } from '../../interfaces/language-run.enum';

export class CreateKataRunDto {
  @IsDefined()
  @IsEnum(LanguageRun)
  language: LanguageRun;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  functionDeclaration: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  testCode: string;
}
