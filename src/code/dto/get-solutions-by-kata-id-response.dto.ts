import { ResponseDto } from './response.dto';
import { IKataAnswer } from '../interfaces/kata-answer.interface';

export class GetSolutionsByKataIdResponseDto extends ResponseDto {
  value: IKataAnswer[];
}