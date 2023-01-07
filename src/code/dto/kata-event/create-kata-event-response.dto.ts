import { ResponseDto } from '../response.dto';
import { IKataEvent } from '../../interfaces/kata-event.interface';

export class CreateKataEventResponseDto extends ResponseDto {
  value?: IKataEvent;
}
