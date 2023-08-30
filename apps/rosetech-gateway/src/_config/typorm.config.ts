
import { registerAs } from '@nestjs/config';
import { config } from './configuration';

export default registerAs('typeorm', () => (config.database))
// export const connectionSource = new DataSource((config.database) as DataSourceOptions);