import { DynamicModule, Module } from '@nestjs/common';
// import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';
import { databaseProviders } from './database.providers';

@Module({
    providers: [Connection, ...databaseProviders],
    exports: [...databaseProviders]
})
export class DatabaseModule {
    static forRoot(entities = []): DynamicModule {
        // const providers = createDatabaseProviders(options, entities);
        return {
          global: false,
          module: DatabaseModule,
          // providers: providers,
          // exports: providers,
        };
      }
}
