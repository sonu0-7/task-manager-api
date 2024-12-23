import {TaskStatus} from "../../task/entities/task.entity"
export class TaskResponse {
    id: number;
    title: string;
    description: string;
    status: TaskStatus ;
    createdAt: string;
}