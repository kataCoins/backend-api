import { Document } from 'mongoose';

export interface IKataFile {
  id?: string;
  fileName: string;
  extension: string;
  fileNameSave: string;
}
