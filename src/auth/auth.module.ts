import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { userProviders } from 'src/user/user.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [AuthController],
  providers: [...userProviders, AuthService, UserService],
})
export class AuthModule {}
