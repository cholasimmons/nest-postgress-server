import { Injectable } from '@nestjs/common';
import { Connection } from '../_database/connection.provider';

@Injectable()
export class ConnectionService {
    connection;

    constructor(){
        this.connection = new Connection()
    }
}
