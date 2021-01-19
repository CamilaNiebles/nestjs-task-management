import { Repository, EntityRepository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/cteate-task.dto';
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Query } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async getTask(filterDto: GetTaskFilterDto): Promise<Task[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        if(status){
            query.andWhere('task.status = :status', {status});
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search:`%${search}%`})
        }
        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(CreateTaskDto:CreateTaskDto){
        const task = new Task;
        const { title, description } = CreateTaskDto;
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }
}