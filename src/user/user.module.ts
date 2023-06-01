import { CenterService } from '@/center/center.service';
import { DatabaseModule } from '@/common/database/database.module';
import { MailService } from '@/helper/mail/mail.service';
import { JWT_OPTIONS } from '@/utils/global.constant';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: JWT_OPTIONS.secret,
      signOptions: { expiresIn: JWT_OPTIONS.expiresIn },
    }),
  ],
  controllers: [UserController],
  providers: [...UserProvider, UserService, MailService, CenterService],
})
export class UserModule {}
