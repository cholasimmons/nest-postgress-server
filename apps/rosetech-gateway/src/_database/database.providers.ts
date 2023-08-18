import { dirname } from "path";
import { UserEntity } from "src/users/entity/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const ormOptions:DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt((process.env.DATABASE_PORT||'5432'),10),
  username: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  schema: process.env.DATABASE_SCHEMA,
  // entities: [UserEntity],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV==='development' ? true : false,
  // migrations: [],
  // migrationsTableName: 'custom_migration_table'
}

console.log('entities: ',ormOptions.entities);


export const databaseProviders = [
    {
      provide: 'USER_REPOSITORY',
      useFactory: async (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: ['DATA_SOURCE']
    },
];

export class DatabaseProviders {  
    public createDatabaseProviders(options: string[], entities: string[]): any{
        return '';
    }
}