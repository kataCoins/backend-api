import { ResponseDto } from '../response.dto';
import { IKataWithAnswerPerUser } from '../../interfaces/kata-with-answer-per-user.interface';

export class GetAllKataResponseDto extends ResponseDto {
  value?: IKataWithAnswerPerUser[];
}
