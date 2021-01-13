import { IsNotEmpty } from 'class-validator';
/**
 * DTO are a software development concept, not a model. This concept is useful
 * for storage, retrieval, serialization and deserialization of own data.
 * They could be a classes or interfaces but the interfaces are not supported in typescript
 * and are not preserved on post-compilation. For that reason, here going to define a class.
 */
 export class CreateTaskDto {
     @IsNotEmpty()
     title: string;

     @IsNotEmpty()
     description:string
 }