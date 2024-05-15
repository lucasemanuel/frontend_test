import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.backendUrl}/account`;

  constructor(private http: HttpClient) {
  }

  public getAccounts(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  public deleteAccount(accountNumber: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${accountNumber}`)
  }
}
