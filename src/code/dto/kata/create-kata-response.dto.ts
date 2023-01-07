import { ResponseDto } from '../response.dto';
import { IKata } from '../../interfaces';

export class CreateKataResponseDto extends ResponseDto {
  value?: IKata;
}
