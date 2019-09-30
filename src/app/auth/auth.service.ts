import { Injectable } from '@angular/core';
import { SignupData } from './signup/signup-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginData } from './login/login-data.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })

export class AuthService {
    private isAuthenticated: boolean = false;
    private token: string;
    private tokenTimer: any;
    private username: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient,
                private router: Router){}

    getToken () {
        return this.token;
    }
    
    getUserName () {
        return this.username;
    }

    getIsAuth() {
    return this.isAuthenticated;
    }

    getAuthStatusListener() {
    return this.authStatusListener.asObservable();
    }

    createUser(name: string, email: string, password: string){
        const newUser: SignupData = {name: name, email: email, password: password};
        this.http
        .post<{ message: string; token: string; expiresIn: number }>(
            "http://localhost:3000/users/signup", 
            newUser
        )
        .subscribe(response => {
            const token = response.token;
            this.token = token;
            if (token) {
                this.username = name;        
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                console.log(expirationDate);
                this.saveAuthData(token, name, expirationDate);
                this.router.navigate(["/"]);
            }
        })
    }

    login(email: string, password: string) {
        const user: LoginData = {email: email, password: password};
        this.http
        .post<{token: string, name: string, expiresIn: number}>(
            "http://localhost:3000/users/login",
            user
        )
        .subscribe(response => {
            console.log(response);
            const token = response.token;
            this.token = token;
            if (token) {
                const username = response.name;
                this.username = username;
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                console.log(expirationDate);
                this.saveAuthData(token, username, expirationDate);
                this.router.navigate(["/"]);
            }
        })
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.username = null;
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
            this.username = authInformation.username;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, name: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("expiration", expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("expiration");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const username = localStorage.getItem("name");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            username: username,
            expirationDate: new Date(expirationDate)
        }
    }

}