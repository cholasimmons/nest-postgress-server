import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubscriber } from './user.subscriber';
import { RoleEntity } from './roles/roles.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UsersService, Repository, UserSubscriber],
    exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
