import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriber } from './user.subscriber';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UsersService /*, Repository, UserSubscriber*/],
    exports: [UsersService]
})
export class UsersModule {}
