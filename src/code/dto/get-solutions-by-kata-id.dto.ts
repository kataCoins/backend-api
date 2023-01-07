import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class GetSolutionsByKataIdDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  kataId: string;
}