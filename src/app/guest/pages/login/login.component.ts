import { Component } from '@angular/core';
import { LayoutService } from '../../../shared/layout/service/app.layout.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,

    imports: [
      ButtonModule,
      CheckboxModule,
      InputTextModule,
      FormsModule,
      PasswordModule
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

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService) { }
}
