import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/cteate-task.dto';

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
    
    /**
     * In this method is passed the param in the url. For that reason use the colon 
     * and id, to indicate that. In the param decorator specify the key that the api
     * is going to receive.
     * @param id 
     */
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task { 
        return this.taskService.getTaskById(id);
    }
    
    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto) : Task {
        return this.taskService.createTask(CreateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string): void{
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateStatusById(@Param('id') id:string, @Body('status') status: TaskStatus) : Task{
        return this.taskService.updateStatusById(id, status);
    }
}
