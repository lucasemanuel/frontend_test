import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './shared/layout/app.layout.component';
import { authenticatedGuard } from './shared/guards/authenticated.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
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
            // {
            //   path: '', component: AppLayoutComponent,
            // },
            // { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
