import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configSvc: ConfigService){}

  getHello(): string {
    return 'Hello World on port '+this.configSvc.get<string>('port');
  }
}
