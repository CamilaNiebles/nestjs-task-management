import { Injectable, NotFoundException } from '@nestjs/common';
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
        const found = this.tasks.find(task => task.id === id);
        if(!found){
            throw new NotFoundException(`The task with id ${id} is not found`);
        }
        return found;
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
        //Validate if the task exists
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateStatusById(id: string, status: TaskStatus) : Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
