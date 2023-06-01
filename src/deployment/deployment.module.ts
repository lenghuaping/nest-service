import { DatabaseModule } from '@/common/database/database.module';
import { DeploymentProviders } from '@/deployment/deployment.provider';
import { GitlabProviders } from '@/gitlab/gitlab.provider';
import { GitlabService } from '@/gitlab/gitlab.service';
import { UserProvider } from '@/user/user.provider';
import { UserService } from '@/user/user.service';
import { Module } from '@nestjs/common';
import { DeploymentController } from './deployment.controller';
import { DeploymentService } from './deployment.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DeploymentController],
  providers: [
    ...UserProvider,
    ...GitlabProviders,
    GitlabService,
    ...DeploymentProviders,
    UserService,
    DeploymentService,
  ],
})
export class DeploymentModule {}
