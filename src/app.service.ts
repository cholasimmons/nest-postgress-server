import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMarketRequestDto } from './dto/create-market-request.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMarketEvent } from './dto/create-market.event';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {

  private readonly markets: any[] = [];

  constructor(@Inject('MARKET') private readonly marketClient: ClientProxy,
    private configSvc: ConfigService){}

  getHello(): string {
    return 'Hello World on port '+this.configSvc.get<string>('port');
  }

  createMarket(createMarketRequest: CreateMarketRequestDto): Observable<any> {
    const success = this.markets.push({createMarketRequest});

    if(!success) return of(false);

    const dt = new CreateMarketEvent(createMarketRequest.name, createMarketRequest.location);
    console.log('Emitting \'New Market\' signal with payload... ', dt);

    return this.marketClient.send({cmd: 'market_created'}, dt)
  }
}
