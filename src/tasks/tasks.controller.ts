import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    /**
     * Inject the service to the controller through the constructor.
     * This kind of injection allows to use this instance in all methods 
     * for this class.
     * @param taskService instance from TaskService class
     */
    constructor(private taskService: TasksService){}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(
        @Body('title') title:string,
        @Body('description') description:string
    ) : Task {
        return this.taskService.createTask(title, description);
    }
}
