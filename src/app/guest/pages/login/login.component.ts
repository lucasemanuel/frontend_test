import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../shared/layout/service/app.layout.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
      ButtonModule,
      CheckboxModule,
      InputTextModule,
      FormsModule,
      PasswordModule,
      ReactiveFormsModule,
      CommonModule
    ],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = "";

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.error = "E-mail e Password inválido!";
      return;
    }
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: response => {
        localStorage.setItem("token", response.token)
        this.error = "";
        this.router.navigate(["dashboard"])
      },
      error: error => {
        if (error?.status === 401) {
          this.error = "E-mail e Password inválido!";
          return;
        }
        return throwError(() => error);
      }
    });
  }
}
