import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import type { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // GET /tasks?userId=:userId&completed=:completed: returns all tasks for a user and filters by completion
  @Get()
  async findAll(@Query() query: any): Promise<Task[]> {
    return this.taskService.findAll(query);
  }

  // POST /tasks: creates a new task
  @Post()
  async createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  // GET /tasks/:id: returns a task by id
  @Get(':id')
  async findTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.findTaskById(id);
  }

  // PUT /tasks/:id: updates a task by id
  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updatedData: Partial<Task>,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updatedData);
  }

  // DELETE /tasks/:id: deletes a task by id
  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  // POST /tasks/:id/complete: marks a task as completed
  @Post(':id/complete')
  async completeTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.completeTask(id);
  }

  // POST /tasks/:id/undo: marks a task as not completed
  @Post(':id/undo')
  async undoTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.undoTask(id);
  }
}
