import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDefault(): string {
    return "Hello you, it's the default endpoint!";
  }
}
