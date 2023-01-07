import { Document } from 'mongoose';

export interface IKataRunSettings {
  run_time_limit: string;
  wall_time_limit: string;
  stack_size_limit: string;
  process_count_limit: string;
  storage_size_limit: string;
  memory_limit: string;
}
