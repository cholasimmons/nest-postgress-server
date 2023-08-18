import { registerAs } from '@nestjs/config';
export default registerAs('filesystem', () => ({
  default: 'docs',
  disks: {
    docs: {
      driver: 's3',
      bucket: process.env.AWS_S3_DOCS_BUCKET,
      key: process.env.AWS_KEY,
      secret: process.env.AWS_SECRET,
      region: process.env.AWS_REGION,
    },
    invoices: { // `invoices` disk, will contain the invoices of all the orders passed so far
      driver: 's3',
      bucket: process.env.AWS_S3_DOCS_BUCKET,
      key: process.env.AWS_KEY,
      secret: process.env.AWS_SECRET,
      region: process.env.AWS_REGION,
    },
    products: { // `products` disk, will contain photos of all the products
      driver: 's3',
      bucket: process.env.AWS_S3_PROFILE_PIC_BUCKET,
      key: process.env.AWS_KEY,
      secret: process.env.AWS_SECRET,
      region: process.env.AWS_REGION,
    },
    reports: {
      driver: 'local',
      basePath: '/home/ubuntu/var/www/nest-server-app/storage', // fully qualified path of the folder
      baseUrl: 'https://simmons.studio',
    }
  }})
);