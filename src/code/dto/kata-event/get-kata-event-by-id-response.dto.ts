import { ResponseDto } from '../response.dto';
import { IKataEvent } from '../../interfaces/kata-event.interface';

export class GetKataEventByIdResponseDto extends ResponseDto {
  value?: IKataEvent;
}
