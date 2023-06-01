import { User } from './entities/user.entity';

export const UserProvider = [
  {
    provide: 'UserRepository',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(User),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
