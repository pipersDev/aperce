import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tasks, CreateTaskDto, TaskStatus } from '../models/task.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL + '/tasks';

  getTasks(status?: string, userId?: number): Observable<Tasks[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    if (userId) params = params.set('userId', userId.toString());
    return this.http.get<Tasks[]>(this.apiUrl, { params });
  }

  createTask(task: CreateTaskDto): Observable<Tasks> {
    return this.http.post<Tasks>(this.apiUrl, task);
  }

  updateTaskStatus(id: number, status: TaskStatus): Observable<void> {
    let state = status === 'Pending' ? 1 : 2;
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, { newStatus: state });
  }
}
