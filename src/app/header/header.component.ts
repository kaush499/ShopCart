import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
    userIsAuthenticated: boolean = false;
    userName: string;
    private authListenerSubs: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.userName = this.authService.getUserName();
        this.authListenerSubs = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
            if(isAuthenticated){
                this.userIsAuthenticated = true;
                this.userName = this.authService.getUserName();
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