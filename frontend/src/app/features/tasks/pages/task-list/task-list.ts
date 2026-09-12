import { Component, OnInit, signal, inject } from '@angular/core';
import { TaskService } from '../../../../core/services/task';
import { TaskStatus, Tasks } from '../../../../core/models/task.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  takList = signal<Tasks[]>([]);
  taskService = inject(TaskService);

  ngOnInit() {
    this.getTasksAll();
  }

  async getTasksAll() {
    this.taskService.getTasks().subscribe({
      next: (tasks: Tasks[]) => {
        this.takList.set(tasks.sort((a, b) => a.id - b.id));
      },
      error: (error: any) => {
        console.error('Error al obtener las tareas:', error);
      }
    });
  }

  onChangeStatus(task: Tasks): void {
    if (!task.id) return;

    this.taskService.updateTaskStatus(task.id, task.status).subscribe(() => this.getTasksAll());
  }
}
