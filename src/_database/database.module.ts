import { DynamicModule, Module } from '@nestjs/common';
// import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';
import { databaseProviders, ormOptions } from './database.providers';
import { ConnectionService } from './connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule], inject: [ConfigService], useFactory: (configSvc: ConfigService) => ormOptions
  })],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule {
  /*
    static forRoot(entities = []): DynamicModule {
        // const providers = createDatabaseProviders(options, entities);
        return {
          global: false,
          module: DatabaseModule,
        };
      }
      */
}
