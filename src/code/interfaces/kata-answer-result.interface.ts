import { Document } from 'mongoose';

export interface IKataAnswerResult {
  status: number;
  stdout: string;
  stderr: string;
  time: string;
  time_wall: string;
  memory_used: number;
}
