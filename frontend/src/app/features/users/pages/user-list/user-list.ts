import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { CreateUserDto, Users } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  userList = signal<Users[]>([]);
  userService = inject(UserService);

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    this.userService.getUsers().subscribe({
      next: (users: Users[]) => {
        this.userList.set(users.sort((a, b) => a.id - b.id));
      },
      error: (error: any) => {
        console.error('Error al obtener los usuarios:', error);
      }
    });
  }
  
}
