import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, CreateUserDto } from '../models/user.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL + '/users';

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }

  createUser(user: CreateUserDto): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user);
  }
}
