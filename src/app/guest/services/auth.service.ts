import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string): Observable<any> {
    const data = { email, password };

    return this.http.post<any>(`${this.apiUrl}/auth/login`, data);
  }
}
