import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required } from '@angular/forms/signals';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Users } from '../../../../core/models/user.model';
import { CreateTaskDto } from '../../../../core/models/task.model';
import { UserService } from '../../../../core/services/user';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../../core/services/task';

@Component({
  selector: 'app-task-form-modal',
  imports: [CommonModule, FormField, RouterLink],
  providers: [NgbActiveModal],
  templateUrl: './task-form-modal.html',
  styleUrl: './task-form-modal.css',
})
export class TaskFormModal implements OnInit {
  userCreate = signal<CreateTaskDto>({
    title: '',
    description: '',
    userId: 0,
    priority: ''
  });

  taskFormModel = signal({
    title: '',
    description: '',
    userId: null as number | null,
    priority: ''
  });
  userService = inject(UserService);
  taskService = inject(TaskService);
  router = inject(Router);
  userList = signal<Users[]>([]);

  taskForm = form(this.taskFormModel, (fieldPath) => {
    required(fieldPath.title, { message: 'El título es obligatorio' });
    required(fieldPath.userId, { message: 'Debe asignar un usuario a la tarea' });
  });

  ngOnInit() {
    this.getAllUsers();
  }


  onSubmit(): void {
    const rawForm = this.taskFormModel();

    // Validamos si tiene título y usuario asignado
    if (!rawForm.title || !rawForm.userId) {
      return;
    }

    this.userCreate.set({
      title: rawForm.title.trim(),
      description: rawForm.description.trim(),
      userId: rawForm.userId,
      priority: rawForm.priority
    });

    this.taskService.createTask(this.userCreate()).subscribe();
    this.router.navigate(['/tasks']);
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
}
