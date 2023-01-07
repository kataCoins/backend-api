import * as mongoose from 'mongoose';
import { IKataEventResult } from './kata-event-result.interface';

export interface IKataEvent {
  id?: string;
  kataId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  kataEventResults: IKataEventResult[];
}
