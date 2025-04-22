import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Repository } from 'typeorm';
import type { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY') private taskRepository: Repository<Task>,
  ) {}

  async createTask(task: Task): Promise<Task> {
    if (!task.title || !task.userId) {
      throw new HttpException(
        'Not enough informations to create a task',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newTask = this.taskRepository.create(task);
    return await this.taskRepository.save(newTask);
    // return await this.taskRepository.save(task);
  }

  async findAll(query: any): Promise<Task[]> {
    const where: any = {};

    if (query.completed !== undefined) {
      where.completed = query.completed === 'true';
    }

    if (query.userId) {
      where.userId = query.userId * 1;
    }

    return this.taskRepository.find({ where });
  }

  async findTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: number, updatedData: Partial<Task>): Promise<Task> {
    const task = await this.findTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const isCompleting = updatedData.completed === true && !task.completed;
    const isUncompleting = updatedData.completed === false && task.completed;

    if (isCompleting) {
      task.completedAt = new Date();
    } else if (isUncompleting) {
      task.completedAt = null;
    }

    Object.assign(task, updatedData);

    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.softDelete(id);
  }

  async completeTask(id: number): Promise<Task> {
    const task = await this.findTaskById(id);
    task.completed = true;
    task.completedAt = new Date();
    return await this.taskRepository.save(task);
  }

  async undoTask(id: number): Promise<Task> {
    const task = await this.findTaskById(id);
    task.completed = false;
    task.completedAt = null;
    return await this.taskRepository.save(task);
  }
}
