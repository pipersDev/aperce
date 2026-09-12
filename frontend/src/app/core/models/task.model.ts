export type TaskStatus = 'Pending' | 'InProgress' | 'Done';

export interface Tasks {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  userId: number;
  userName?: string;
  createdAt?: string;
  metadata?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  userId: number;
  priority?: string;
}

export interface UpdateTaskStatusDto {
  status: TaskStatus;
}