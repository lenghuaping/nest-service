import { parsingEnvConfig } from '@/utils';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

// 设置数据库类型
const databaseType: DataSourceOptions['type'] = 'mysql';
const { MYSQL } = parsingEnvConfig();

const MYSQL_DATABASE_CONFIG = {
  ...MYSQL,
  type: databaseType,
  entities: [path.join(__dirname, `../../**/entities/*.entity{.ts,.js}`)],
};

const MYSQL_DATA_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG);

// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: async () => {
      await MYSQL_DATA_SOURCE.initialize();
      return MYSQL_DATA_SOURCE;
    },
  },
];
