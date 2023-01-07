import { ResponseDto } from '../response.dto';
import { IKataWithAnswerPerUser } from '../../interfaces/kata-with-answer-per-user.interface';

export class KataDetailsPerUserResponseDto extends ResponseDto {
  value?: IKataWithAnswerPerUser;
}
