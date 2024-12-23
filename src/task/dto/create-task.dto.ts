import {IsEnum, IsNotEmpty, IsOptional, IsString  } from 'class-validator';
import {TaskStatus} from '../entities/task.entity'

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    description: string;

    @IsEnum(TaskStatus, { message: `Status must be one of: ${Object.values(TaskStatus).join(', ')}` })
    status: TaskStatus;

    @IsOptional()
    createdAt: string;
}