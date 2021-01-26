import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const databaseConfiguration = config.get('database');
/**
 * Here configure the connection to the database,
 * the param entities is going to search all files with the
 * subfix .entity.ts.
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
    type:databaseConfiguration.type,
    host:databaseConfiguration.host,
    port:databaseConfiguration.port,
    username:databaseConfiguration.username,
    password:databaseConfiguration.password,
    database:databaseConfiguration.database,
    entities:[__dirname +'/../**/*.entity{.ts,.js}'],
    synchronize:databaseConfiguration.synchronize
}