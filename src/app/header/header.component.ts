import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
    userIsAuthenticated: boolean = false;
    userName: string;
    isAdmin: boolean;
    private authListenerSubs: Subscription;

    constructor(private authService: AuthService,
                private userService: UserService) {}

    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.userName = this.userService.getUserName();
        this.isAdmin = this.userService.getIsAdmin();
        this.authListenerSubs = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
            if(isAuthenticated){
                this.userIsAuthenticated = true;
                this.userName = this.userService.getUserName();
                this.isAdmin = this.userService.getIsAdmin();
            } else{
                this.userIsAuthenticated = false;
                this.userName = null;
            }
        });
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authListenerSubs.unsubscribe();
    }
    
};