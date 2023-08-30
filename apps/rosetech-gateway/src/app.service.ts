import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMarketRequestDto } from './dto/create-market-request.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateMarketEvent } from './dto/create-market.event';
import { Observable, of } from 'rxjs';
import { appConstants } from 'apps/constants';

@Injectable()
export class AppService {

  private readonly markets: any[] = [];

  constructor(@Inject(appConstants.AUTH_SERVICE.name) private readonly authClient: ClientProxy,
    private configSvc: ConfigService){
    }

  getHello(): Observable<string> {
    return this.authClient.send<string,string>('hello', 'Frank');
  }

}
