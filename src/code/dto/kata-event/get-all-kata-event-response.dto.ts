import { ResponseDto } from '../response.dto';
import { IKataEvent } from '../../interfaces/kata-event.interface';

export class GetAllKataEventResponseDto extends ResponseDto {
  value?: IKataEvent[];
}
