
export default () => ({
    port: parseInt(process.env.NEST_PORT!, 10) || 3000,
    jwt: {
      secret: process.env.JWT_SECRET?.toString(),
      expiresIn: process.env.JWT_EXPIRESIN,
    },
    database: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!, 10) || 5432,
      name: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      schema: process.env.DATABASE_SCHEMA
    },
    pgadmin: {
      user: process.env.PGADMIN_USER,
      password: process.env.PGADMIN_PASSWORD
    }
  });
  