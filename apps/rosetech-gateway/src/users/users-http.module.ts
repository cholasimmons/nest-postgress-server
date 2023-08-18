
import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { AuthController } from '../auth/auth.controller';

@Module({
  imports: [UsersModule],
  providers: [UsersService],
  controllers: [AuthController]
})
export class UserHttpModule {}
