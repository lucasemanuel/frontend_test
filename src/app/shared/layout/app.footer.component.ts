import { Component } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { UserService } from '../../customer/services/user.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {
    user$ = this.userService.user$;

    constructor(public layoutService: LayoutService, private userService: UserService) { }
}
