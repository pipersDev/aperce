import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'tasks', loadComponent: () => import('./features/tasks/pages/task-list/task-list').then(m => m.TaskList) },
    { path: 'tasks/new', loadComponent: () => import('./features/tasks/components/task-form-modal/task-form-modal').then(m => m.TaskFormModal) },
    { path: 'tasks/:id', loadComponent: () => import('./features/tasks/components/task-form-modal/task-form-modal').then(m => m.TaskFormModal) },
    { path: 'user/new', loadComponent: () => import('./features/users/components/user-create/user-create').then(c => c.UserCreate) },
    { path: 'users', loadComponent: () => import('./features/users/pages/user-list/user-list').then(c => c.UserList) },
    { path: '**', redirectTo: 'tasks' }
];
