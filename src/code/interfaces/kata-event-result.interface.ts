import * as mongoose from 'mongoose';

export interface IKataEventResult {
  userId: string;
  username: string;
  kataAnswerId: string;
  time: string;
  status: number;
}
