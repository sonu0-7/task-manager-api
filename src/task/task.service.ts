import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Success, SuccessResponse } from 'src/utils/common-dto/success-dto';
import { TaskResponse } from 'src/utils/common-dto/response-dto';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}
  async createTask(createTaskDto: CreateTaskDto): Promise<SuccessResponse> {
    try {
      return await this.taskRepo
        .findOne({ where: { title: createTaskDto.title } })
        .then(async (existingTask) => {
          
          if (!existingTask) {
            console.log(createTaskDto)
            return await this.taskRepo.save(createTaskDto).then((res) => {
              if (!res) {
                return new SuccessResponse ("Something wrong while creating the task's", 500);
              }

              return new SuccessResponse ('Created Successfully!', 201);
            });
          } else {
            return new SuccessResponse ('Task\'s already exists', 403);
          }
        });
    } catch (error) {
      console.log("e")
      return error;
    }
  }

  async getAllTasks(): Promise<Success<TaskResponse> | Success<Task[]>> {
    try {
      return await this.taskRepo.find().then((res) => {
        if (!res.length) {
          return new Success('Not task found', res, 400, res.length);
        }
        
        return new Success('Task found', res, 200, res.length);
      });
    } catch (error) {
      return error;
    }
  }

  async getTaskById(id: number): Promise<Success <TaskResponse> | Success<{}>> {
    try {
      return await this.taskRepo
        .findOne({ where: { id: id } })
        .then((response) => {

          if (!response) {
            return new Success('Task not found', {}, 404);
          }
          
          return new Success('Success', response, 200);
        });
    } catch (error) {
      return error;
    }
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<SuccessResponse> {
    try {
      return await this.taskRepo
        .findOne({ where: { id: id } })
        .then(async (response) => {
          if (!response) {
            return new SuccessResponse('Bad request', 403);
          }
          
          // Make sure the updateDto's data present
          if (!updateTaskDto || Object.keys(updateTaskDto).length <= 1) {

            return new SuccessResponse("Data is required to update the task's", 400);
          }

          // To except this id, not be present with the same title
          let condition = {
            title: updateTaskDto.title,
            id: Not(updateTaskDto.id),
          };
          return await this.taskRepo
            .findOne({ select: ['title'], where: condition })
            .then(async (exist) => {
              if (!exist) {
                return await this.taskRepo.save(updateTaskDto).then((res) => {
                  if (!res) {
                    
                    return new SuccessResponse ("Something wrong while updating the task's", 500);
                  }
                  
                  return new SuccessResponse ('Updated Successfully!', 200);
                });
              } else {
                return new SuccessResponse('Duplicate task\'s title', 403)
              }
            });
        });
    } catch (error) {
      return error;
    }
  }

  async deleteTask(id: number) {
    try {
      return await this.taskRepo.delete(id).then((res) => {
        if (res.affected === 0) {
          return new SuccessResponse ("Task's not found", 404);
        }
        return new SuccessResponse("Success", 200);
      });
    } catch (error) {
      return error;
    }
  }
}
