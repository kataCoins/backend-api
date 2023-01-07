import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ExecStepDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  script: string;
}
