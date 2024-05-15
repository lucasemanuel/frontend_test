import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = `${environment.backendUrl}/transaction`;

  constructor(private http: HttpClient) {
  }

  public listTransactions(accountNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${accountNumber}`)
  }

  public registerTransaction(amount: number, accountNumber: string, type: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      amount: Number.parseFloat(amount.toString()),
      type: Number.parseInt(type.toString()),
      bankAccountNumber: accountNumber
    });
  }
}
