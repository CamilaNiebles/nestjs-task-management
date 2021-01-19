import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/cteate-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository,
    ){}

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        return await this.taskRepository.getTask(filterDto);
    }

    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`The task with id ${id} is not found`);
        }
        return found;
    }

    async createTask(CreateTaskDto: CreateTaskDto) {
        return await this.taskRepository.createTask(CreateTaskDto);
    }

    async deleteTask(id: number): Promise<void>{
        const task = await this.getTaskById(id);
        await this.taskRepository.remove(task);
    }

    async updateStatusById(id: number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        task.save();
        return task;
    }

    // updateStatusById(id: string, status: TaskStatus) : Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
