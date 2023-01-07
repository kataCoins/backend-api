import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ExecByIdDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  kataAnswerId: string;

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
