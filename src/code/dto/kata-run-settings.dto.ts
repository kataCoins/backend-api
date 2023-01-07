import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class KataRunSettingsDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  run_time_limit: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  wall_time_limit: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  stack_size_limit: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  process_count_limit: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  storage_size_limit: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  memory_limit: string;
}
