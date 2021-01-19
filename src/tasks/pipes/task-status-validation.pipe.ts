import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

/* Example of casting validation pipe */
export class TaskStatusValidationPipe implements PipeTransform{

    //create an array with the valid values, readonly to create it just once,
    //and any object on the class can modify it.

    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]
    transform(value:any){
        if(!this.isStatusValid(value)){
            throw new BadRequestException();
        }
        return value;
    }

    private isStatusValid(value:any){
        const value_index = this.allowedStatus.indexOf(value);
        return value_index !== -1;
    }

}