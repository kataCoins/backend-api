import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class KataAnswerResultDto {
  @IsDefined()
  @IsNumber()
  status: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  stdout: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  stderr: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  time: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  time_wall: string;

  @IsDefined()
  @IsNumber()
  memory_used: number;
}
