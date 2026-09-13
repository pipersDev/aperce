import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { TaskService } from '../../../../core/services/task';
import { Tasks } from '../../../../core/models/task.model';
import { RouterLink } from '@angular/router';
import { Users } from '../../../../core/models/user.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  takList = signal<Tasks[]>([]);
  userList = signal<Users[]>([]);
  taskService = inject(TaskService);
  userService = inject(UserService);

  selectedUserId = signal<string | number>('');
  selectedStatus = signal<string>('');

  filteredTasks = computed(() => {
    const tasks = this.takList();
    const userId = this.selectedUserId();
    const status = this.selectedStatus();

    return tasks.filter((task) => {
      const matchesUser = !userId || String(task.userId) === String(userId) || task.userName === userId;
      const matchesStatus = !status || task.status === status;
      return matchesUser && matchesStatus;
    });
  });

  ngOnInit() {
    this.getAllUsers();
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

  getAllUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: Users[]) => {
        this.userList.set(users);
      },
      error: (error: any) => {
        console.error('Error al obtener los usuarios:', error);
      }
    });
  }
  

  clearFilters(): void {
    this.selectedUserId.set('');
    this.selectedStatus.set('');
  }
}
