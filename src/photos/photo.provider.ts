
import { DataSource } from 'typeorm';
import { PhotoEntity } from './entity/photo.entity';
import { photoConstants } from './constants';


export const photoProviders = [
  {
    provide: photoConstants.PHOTO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PhotoEntity),
    inject: [photoConstants.DATA_SOURCE],
  },
];
