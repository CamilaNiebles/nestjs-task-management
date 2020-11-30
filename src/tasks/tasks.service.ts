import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/cteate-task.dto';

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

    getTaskById(id: string): Task{
        return this.tasks.find(task => task.id === id);
    }

    createTask(CreateTaskDto: CreateTaskDto): Task {
        const { title, description } = CreateTaskDto;
        const task : Task = {
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task; 
    }

    deleteTask(id:string) : void{
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateStatusById(id: string, status: TaskStatus) : Task {
        // const taskUpdate =  this.tasks.filter(task => task.id === id);
        // this.tasks =  this.tasks.filter(task => task.id !== id);
        // taskUpdate[0].status = status;
        // this.tasks.push(taskUpdate[0]);
        // return taskUpdate[0];

        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
