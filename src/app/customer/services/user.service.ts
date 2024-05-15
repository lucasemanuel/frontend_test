import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { Role } from '../../shared/enums/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.backendUrl}/user`;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>({ id: "", name: "", email: "", role: Role.Customer});
  public readonly user$: Observable<User> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  public getInfo(): Observable<User> {
    return this.http.get<any>(this.apiUrl)
    .pipe(
      tap(user => this.setUser(user))
    );
  }

  public getAccount(): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/account`);
  }


  private setUser(user: User): void {
    this.userSubject.next(user);
  }
}
