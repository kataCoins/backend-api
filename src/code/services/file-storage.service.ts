import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';

@Injectable()
export class FileStorageService {
  private readonly basePath: string;
  constructor() {
    this.basePath = process.env.STORAGE_DIR;
  }

  private checkIfFileOrDirectoryExists(path: string): boolean {
    return fs.existsSync(`${this.basePath}/${path}`);
  }

  async createFile(
    path: string,
    fileName: string,
    data: string,
  ): Promise<boolean> {
    if (!this.checkIfFileOrDirectoryExists(path)) {
      fs.mkdirSync(`${this.basePath}/${path}`);
    }
    const writeFile = promisify(fs.writeFile);
    try {
      await writeFile(`${this.basePath}/${path}/${fileName}`, data, 'utf-8');
      return true;
    } catch (e) {
      return false;
    }
  }

  async readFile(path: string): Promise<string> {
    const readFile = promisify(fs.readFile);
    return readFile(`${this.basePath}/${path}`, 'utf-8');
  }

  async deleteFile(path: string): Promise<boolean> {
    const unlink = promisify(fs.unlink);
    try {
      await unlink(path);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async deleteExecFile(path: string): Promise<void> {
    const unlink = promisify(fs.unlink);
    try {
      await unlink(path);
    } catch (e) {
      console.error(e);
    }
    return;
  }
}
