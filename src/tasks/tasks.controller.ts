import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/cteate-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

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
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.taskService.getTasks(filterDto);
    }
    
    /**
     * In this method is passed the param in the url. For that reason use the colon 
     * and id, to indicate that. In the param decorator specify the key that the api
     * is going to receive.
     * @param id 
     */
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> { 
        return this.taskService.getTaskById(id);
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto: CreateTaskDto) : Promise<Task> {
        return this.taskService.createTask(CreateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id:number): Promise<void>{
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateStatusById(@Param('id', ParseIntPipe) id:number, @Body('status', TaskStatusValidationPipe) status: TaskStatus) : Promise<Task>{
        return this.taskService.updateStatusById(id, status);
    }
}
