import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: "root" })

export class AuthService {
    private isAuthenticated: boolean = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient,
                private userService: UserService,
                private router: Router){}

    getToken () {
        return this.token;
    }
    
    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
    return this.authStatusListener.asObservable();
    }

    createUser(name: string, email: string, password: string){
        const newUser: AuthData = {name: name, email: email, password: password};
        this.http
        .post<{ message: string, token: string, userId: number, expiresIn: number }>(
            "http://localhost:3000/users/signup",
            newUser
        )
        .subscribe(response => {
            const token = response.token;
            this.token = token;
            if (token) {
                this.userService.setUser(response.userId, name, 0);        
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                console.log(expirationDate);
                this.saveAuthData(token, expirationDate); 
            }
        }, err => {
            console.log(err);
        }, () => {
            this.router.navigate(["/"]);
        })
    }

    login(email: string, password: string) {
        const user = {email: email, password: password};
        this.http
        .post<{token: string, userId: number, name: string, isAdmin: number, expiresIn: number}>(
            "http://localhost:3000/users/login",
            user
        )
        .subscribe(response => {
            const token = response.token;
            this.token = token;
            if (token) {
                this.userService.setUser(response.userId, response.name, response.isAdmin);
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                console.log(expirationDate);
                this.saveAuthData(token, expirationDate);
            }
        }, err => {
            console.log(err);
        }, () => {
            this.router.navigate(["/"]);
        })
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userService.autoSetUser();
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        } else {
            this.clearAuthData();
        }
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        this.userService.clearUserData();
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
       
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }

}