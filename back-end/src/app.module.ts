import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenController } from './token/token.controller';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';

@Module({
  imports: [UserModule, PrismaModule, TokenModule],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [],
})
export class AppModule {}
