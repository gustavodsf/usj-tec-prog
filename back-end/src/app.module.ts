import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '@lprisma/prisma.module';
import { AuthModule } from '@auth/auth.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, CoreModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
