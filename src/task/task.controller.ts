import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import type { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/user/:id')
  async findAllTasksByUserId(@Param('id') id: number) {
    return this.taskService.findTasksByUserId(id);
  }

  @Post()
  async create(@Body() task: Task) {
    return this.taskService.createTask(task);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.taskService.findTaskById(id);
  }

  @Get('/user/:id/completed')
  async findCompletedTasksByUserId(@Param('id') id: number) {
    return this.taskService.findTaskByUserIdAndCompleted(id, true);
  }

  @Get('/user/:id/uncompleted')
  async findUncompletedTasksByUserId(@Param('id') id: number) {
    return this.taskService.findTaskByUserIdAndCompleted(id, false);
  }
}
