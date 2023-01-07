import { ResponseDto } from '../response.dto';
import { KataAnswerResultDto } from '../kata-answer-result.dto';

export class RunKataAnswerResponseDto extends ResponseDto {
  value?: KataAnswerResultDto;
}
