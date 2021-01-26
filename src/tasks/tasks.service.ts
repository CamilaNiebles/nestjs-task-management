import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/cteate-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository,
    ){}

    async getTasks(
        filterDto: GetTaskFilterDto,
        user: User): Promise<Task[]>{
        return await this.taskRepository.getTask(filterDto, user);
    }

    async getTaskById(
        id: number,
        user:User): Promise<Task>{
        const found = await this.taskRepository.findOne({where: {id, userId:user.id}});
        if(!found){
            throw new NotFoundException(`The task with id ${id} is not found`);
        }
        return found;
    }

    async createTask(
        CreateTaskDto: CreateTaskDto,
        user:User) {
        return await this.taskRepository.createTask(CreateTaskDto, user);
    }

    async deleteTask(id: number, user: User): Promise<void>{
        const task = await this.getTaskById(id, user);
        await this.taskRepository.remove(task);
    }

    async updateStatusById(id: number, 
        status: TaskStatus,
        user:User): Promise<Task>{
        const task = await this.getTaskById(id, user);
        task.status = status;
        task.save();
        return task;
    }
}
