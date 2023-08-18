import { Injectable } from '@nestjs/common';
import { Connection } from './connection.provider';

@Injectable()
export class ConnectionService {
    connection;

    constructor(){
        this.connection = new Connection()
    }
}
