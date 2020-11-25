import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid} from 'uuid';

@Injectable()
export class TasksService {
    /**
     * Array to make a simple request with local memory.
     * It's very important define this variable like a private variable
     * because if is not in this way, the classes where the services is injected
     * could modify this value. 
     */
    private tasks: Task[] = [];

    getAllTasks(): Task []{
        return this.tasks; 
    }

    createTask(title:string, description:string): Task {
        const task : Task = {
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task; 
    }
}
