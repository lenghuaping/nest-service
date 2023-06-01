import { Permission } from './entities/permission.entity';

export const PermissiontProviders = [
  {
    provide: 'PERMISSION_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Permission),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
