import { Deployment } from './entities/deployment.entity';

export const DeploymentProviders = [
  {
    provide: 'Deployment_Repository',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Deployment),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
