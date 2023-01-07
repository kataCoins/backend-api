import { ResponseDto } from '../response.dto';
import { IKataAnswer } from '../../interfaces/kata-answer.interface';

export class SavaKataAnswerResponseDto extends ResponseDto {
  value?: IKataAnswer;
}
