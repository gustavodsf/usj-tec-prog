import { Module } from '@nestjs/common';

import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { PrismaModule } from '@lprisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}