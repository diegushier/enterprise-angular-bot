import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User, Role } from '../_models';
import { UserService, AuthService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthService,
        private router: Router,
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });

        if (this.currentUser.role === Role.Admin) {
            this.router.navigate(['/admin']);
        } else if (this.currentUser.role === Role.Empresa) {
            this.router.navigate(['/empresa']);
        } else {
            this.router.navigate(['/chat-soporte']);
        }
    }
}