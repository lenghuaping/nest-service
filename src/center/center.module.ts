import { JwtStrategy } from '@/center/jwt/jwt.strategy';
import { DatabaseModule } from '@/common/database/database.module';
import { MailService } from '@/helper/mail/mail.service';
import { UserProvider } from '@/user/user.provider';
import { UserService } from '@/user/user.service';
import { JWT_OPTIONS } from '@/utils/global.constant';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CenterController } from './center.controller';
import { CenterService } from './center.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: JWT_OPTIONS.secret,
      signOptions: { expiresIn: JWT_OPTIONS.expiresIn },
    }),
  ],
  controllers: [CenterController],
  providers: [
    JwtStrategy,
    ...UserProvider,
    CenterService,
    MailService,
    UserService,
  ],
})
export class CenterModule {}
