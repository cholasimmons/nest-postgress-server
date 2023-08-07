import { UserEntity } from "src/users/entity/user.entity";
import { DataSource } from "typeorm";

const ormOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt((process.env.DB_PORT||'5432'),10),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  schema: "public",
  entities: [UserEntity],
  synchronize: true
}

export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: "postgres",
          host: process.env.DB_HOST,
          port: parseInt((process.env.DB_PORT||'5432'),10),
          username: process.env.DB_USER!,
          password: process.env.DB_PASS!,
          database: process.env.DB_NAME!,
          schema: "public",
          entities: [UserEntity],
          synchronize: true
        });
  
        return dataSource.initialize();
      },
    },
];

export class DatabaseProviders {
    public createDatabaseProviders(options: string[], entities: string[]): any{
        return '';
    }
}