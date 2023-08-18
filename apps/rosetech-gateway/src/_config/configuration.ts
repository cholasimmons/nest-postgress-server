
export default () => ({
    port: Number(process.env.NEST_PORT) || 3000,
    jwt: {
      secret: process.env.JWT_SECRET?.toString(),
      expiresIn: process.env.JWT_EXPIRESIN?.toString(),
    },
    database: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 5432,
      name: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      schema: process.env.DATABASE_SCHEMA
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
  });
  