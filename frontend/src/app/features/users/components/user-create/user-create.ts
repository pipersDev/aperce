import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { CreateUserDto } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-user-create',
  imports: [CommonModule, FormField, RouterLink],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate {
  userService = inject(UserService);
  router = inject(Router);
  userFormModel = signal<CreateUserDto>({
    name: '',
    email: '',
  });

  userForm = form(this.userFormModel, (fieldPath) => {
    required(fieldPath.name, { message: 'El nombre es obligatorio' });
    required(fieldPath.email, { message: 'El correo electrónico es obligatorio' });
    email(fieldPath.email, { message: 'Ingrese un correo electrónico válido' });
  });

  ngOnInit(): void {}

  onSubmit(): void {
    
    this.userService.createUser(this.userFormModel()).subscribe();
    this.router.navigate(['/users']);
  }
}
