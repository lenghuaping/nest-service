import { parsingEnvConfig } from '@/utils';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { CenterModule } from './center/center.module';
import { JwtGuard } from './center/jwt/jwt.guard';
import { DeploymentModule } from './deployment/deployment.module';
import { GitlabModule } from './gitlab/gitlab.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { SecretModule } from './secret/secret.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [parsingEnvConfig],
    }),
    GitlabModule,
    SecretModule,
    PermissionModule,
    UserModule,
    RoleModule,
    CenterModule,
    DeploymentModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
