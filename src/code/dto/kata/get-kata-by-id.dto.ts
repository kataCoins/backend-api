import { ResponseDto } from '../response.dto';
import { IKata } from '../../interfaces';

export class GetKataByIdResponseDto extends ResponseDto {
  value?: IKata;
}
