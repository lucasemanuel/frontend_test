import { Routes } from '@angular/router';
import { authenticatedGuard } from './shared/guards/authenticated.guard';
import { AppLayoutComponent } from './shared/layout/app.layout.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./guest/guest-routing.module').then((m) => m.GuestRoutingModule),
    canActivate: [authenticatedGuard]
  },
  {
    path: '',
    component: AppLayoutComponent,
    loadChildren: () => import('./customer/customer-routing.module').then((m) => m.CustomerRoutingModule),
    canActivate: [authenticatedGuard]
  }
];
