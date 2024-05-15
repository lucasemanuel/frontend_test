import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { LayoutService } from '../../../shared/layout/service/app.layout.service';
import { DialogModule } from 'primeng/dialog';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transactions.service';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      MenuModule,
      TableModule,
      StyleClassModule,
      PanelMenuModule,
      ButtonModule,
      DialogModule,
      InputTextModule,
      RadioButtonModule
    ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  user$ = this.userService.user$;
  dialogRegisterTransactionVisible = false;
  dialogListTransactionsVisible = false;
  accounts = <any>[];
  transactions = <any>[];
  transactionType: number = 0;
  transactionAmount: number = 0;
  error = "";
  accountNumberSelected = "";

  account: any;

  constructor(
    public layoutService: LayoutService,
    private userService: UserService,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {
  }

  ngOnInit() {
    this.userService.getInfo().subscribe();
    this.user$.subscribe(user => {
      if (user.role === 'Admin') {
        this.accountService.getAccounts().subscribe({
          next: response => this.accounts = response
        })
      } else {
        this.userService.getAccount().subscribe(response => {
          this.account = response
          this.listTransactions(this.account?.accountNumber)
      });
      }
    })
  }

  ngOnDestroy() {
  }

  deleteAccount(accountNumber: string)
  {
    this.accountService.deleteAccount(accountNumber).subscribe({
      next: () => window.location.reload()
    });
  }

  listTransactions(accountNumber: string)
  {
    this.transactionService.listTransactions(accountNumber).subscribe( response => {
        this.transactions = response.map((transaction: any) => ({
          ...transaction,
          createdAt: new Date(transaction.createdAt)
        }))
      }
    )
  }

  registerTransaction()
  {
    if (this.transactionAmount < 0 ) {
      this.error = "Valor deve ser positivo."
      return;
    }

    this.transactionService.registerTransaction(this.transactionAmount, this.accountNumberSelected, this.transactionType).subscribe({
      next: () => window.location.reload(),
      error: (error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 400)
          this.error = error.error
        return throwError(() => error);
      }
    });
  }

  openDialogRegisterTrasaction(accountNumber: string)
  {
    this.dialogRegisterTransactionVisible = true;
    this.accountNumberSelected = accountNumber;
  }
}
