import { CenterService } from '@/center/center.service';
import { DatabaseModule } from '@/common/database/database.module';
import { SecretProviders } from '@/secret/secret.provider';
import { UserProvider } from '@/user/user.provider';
import { UserService } from '@/user/user.service';
import { JWT_OPTIONS } from '@/utils/global.constant';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SecretController } from './secret.controller';
import { SecretService } from './secret.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: JWT_OPTIONS.secret,
      signOptions: { expiresIn: JWT_OPTIONS.expiresIn },
    }),
  ],
  controllers: [SecretController],
  providers: [
    ...UserProvider,
    ...SecretProviders,
    UserService,
    SecretService,
    CenterService,
  ],
})
export class SecretModule {}
