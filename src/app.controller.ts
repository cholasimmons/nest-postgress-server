import { Body, Controller, Get, Header, Param, ParseIntPipe, Post, Req, Res, Render, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from './_decorators/public.decorator';
import { Observable, interval, map } from 'rxjs';
import { MessageEvent } from './_interfaces/events.interface';


@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  root(@Res() res: Response) {
    return res.render('index', {message: 'Welcome to our brand new server!'})
    // this.appService.getHello();
  }

  @Post(':id')
  @Header('Cache-Control', 'none')
  acceptHello(@Param('id', ParseIntPipe) id?: number):any {
    console.log(id);
    
    return {data: 'Post received '+id};
  }

  // Events from the server
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    /*
    * Run this on the client
    * 
    const eventSource = new EventSource('/sse');
    eventSource.onmessage = ({ data }) => {
      console.log('New message', JSON.parse(data));
    };
    */
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } }) ));
  }
}
