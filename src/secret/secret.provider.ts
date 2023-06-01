import { Secret } from './entities/secret.entity';

export const SecretProviders = [
  {
    provide: 'Secret_Repository',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Secret),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
