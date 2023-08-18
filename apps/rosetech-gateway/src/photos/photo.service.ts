
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PhotoEntity } from './entity/photo.entity';
import { photoConstants } from './constants';

@Injectable()
export class PhotoService {
  constructor(
    @Inject(photoConstants.PHOTO_REPOSITORY)
    private photoRepository: Repository<PhotoEntity>,
  ) {}

  async findAll(): Promise<PhotoEntity[]> {
    return this.photoRepository.find();
  }
}
