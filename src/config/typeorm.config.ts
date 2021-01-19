import { TypeOrmModuleOptions } from '@nestjs/typeorm';
/**
 * Here configure the connection to the database,
 * the param entities is going to search all files with the
 * subfix .entity.ts.
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'Qesete92**',
    database:'taskmanagement',
    entities:[__dirname +'/../**/*.entity{.ts,.js}'],
    synchronize:true
}