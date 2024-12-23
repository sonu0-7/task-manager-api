import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Success, SuccessResponse } from 'src/utils/common-dto/success-dto';
import { TaskResponse } from 'src/utils/common-dto/response-dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<SuccessResponse> {
    try {
      return await this.taskService.createTask(createTaskDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async getAllTasks() : Promise<Success<TaskResponse> | Success<Task[]>>{
    try {
      return await this.taskService.getAllTasks();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Success <TaskResponse> | Success<{}>> {
    try {
      return await this.taskService.getTaskById(id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  async updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<SuccessResponse> {
    try {
      return this.taskService.updateTask(id, updateTaskDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) :  Promise<SuccessResponse>{
    try {
      return await this.taskService.deleteTask(id);
    } catch (error) {
      return error;
    }
  }
}
