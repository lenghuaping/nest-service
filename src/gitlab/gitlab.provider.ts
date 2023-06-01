import { Gitlab } from './entities/gitlab.entity';

export const GitlabProviders = [
  {
    provide: 'Gitlab_Repository',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Gitlab),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
