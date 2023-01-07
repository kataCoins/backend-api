import { ResponseDto } from '../response.dto';
import { IKataRun } from '../../interfaces';

export class CreateKataRunResponseDto extends ResponseDto {
  value?: IKataRun;
}
