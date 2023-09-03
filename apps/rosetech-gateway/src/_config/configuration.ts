
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { RoleEntity } from '../users/roles/roles.entity';

dotenvConfig({ path: process.env.npm_package_env_NODE_ENV === 'development' ? '.env.development' : '.env.production' });

export const config = {
    port: Number(process.env.NEST_PORT) || 3000,
    jwt: {
      secret: process.env.JWT_SECRET?.toString(),
      expiresIn: process.env.JWT_EXPIRESIN?.toString(),
    },
    database: {
      // type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [UserEntity],
      synchronize: process.env.npm_package_env_NODE_ENV === 'development' ? true : false // set to false in production
      
      // migrations: [],
      // logging: false,
      // autoLoadEntities: true,
      // schema: process.env.DATABASE_SCHEMA
    },
    pgadmin: {
      user: process.env.PGADMIN_USER,
      password: process.env.PGADMIN_PASSWORD
    },
    filesystem: {
      default: 'docs',
      disks: {
        docs: {
          driver: 's3',
          bucket: process.env.AWS_S3_DOCS_BUCKET,
          key: process.env.AWS_KEY,
          secret: process.env.AWS_SECRET,
          region: process.env.AWS_REGION,
        }
      }
    }
  };
  
  export default () => ((config))

  export function getAuthSvcOptions(){
    return config.pgadmin
  }