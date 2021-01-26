import { Repository, EntityRepository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/cteate-task.dto';
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    private log = new Logger('Task repository');

    async getTask(
        filterDto: GetTaskFilterDto,
        user: User): Promise<Task[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where('task.userIdaaaaaaaaaaaaa = :userId', { userId: user.id});

        if(status){
            query.andWhere('task.status = :status', {status});
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search:`%${search}%`})
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.log.error(`Cant find task for user ${user.username} filter: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createTask(CreateTaskDto:CreateTaskDto, user:User){
        const task = new Task;
        const { title, description } = CreateTaskDto;
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }
}