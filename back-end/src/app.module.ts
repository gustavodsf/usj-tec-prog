import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '@lprisma/prisma.module';
import { AuthModule } from '@auth/auth.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, CoreModule, UsersModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class AppModule {}
