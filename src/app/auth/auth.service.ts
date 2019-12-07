import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { UserService } from '../user/user.service';
import { CartService } from '../cart/cart.service';

@Injectable({ providedIn: "root" })

export class AuthService {
    private isAuthenticated: boolean = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient,
                private userService: UserService,
                private router: Router,
                private cartService: CartService){}

    // returns token
    getToken () {
        return this.token;
    }
    
    getIsAuth() {
        return this.isAuthenticated;
    }

    // return authStutus changed observable
    getAuthStatusListener() {
    return this.authStatusListener.asObservable();
    }

    // creates user in database
    async createUser(name: string, email: string, password: string){
        const newUser: AuthData = {name: name, email: email, password: password};
        this.http
        .post<{ message: string, token: string, userId: number, expiresIn: number }>(
            "http://localhost:3000/users/signup",
            newUser
        )
        .subscribe(async response => {
            const token = response.token;
            this.token = token;
            if (token) {
                //  sets user
                this.userService.setUser(response.userId, name, 0);   
                //  sets the  cart in cartService
                await this.cartService.setUser(response.userId);     
                const expiresInDuration = response.expiresIn;
                // sets timer
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                console.log(expirationDate);
                this.saveAuthData(token, expirationDate); 
                this.router.navigate(["/"]);
            }
        }, err => {
            console.log(err);
        });
    }

    // logins the user 
    async login(email: string, password: string, redirectUrl: string) {
        const user = {email: email, password: password};
        this.http
        .post<{token: string, userId: number, name: string, isAdmin: number, expiresIn: number}>(
            "http://localhost:3000/users/login",
            user
        )
        .subscribe(async response => {
            const token = response.token;
            this.token = token;
            if (token) {
                //  sets user
                this.userService.setUser(response.userId, response.name, response.isAdmin);   
                //  sets the  cart in cartService
                await this.cartService.setUser(response.userId);     
                const expiresInDuration = response.expiresIn;
                // sets timer
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                console.log(expirationDate);
                this.saveAuthData(token, expirationDate);
                if(redirectUrl){
                    this.router.navigateByUrl(redirectUrl);
                }else {
                    this.router.navigate(["/"]);
                }
                
            }
        }, err => {
            console.log(err);
        });
    }

    // logouts the user and clears the token
    logout() {
        this.cartService.removeUser();
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);
    }

    // if there is userData and token in localstorage it automatically sets the user
    async autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.userService.autoSetUser();
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.cartService.setUser(Number(localStorage.getItem("userId")))
            .then(val => {
                this.authStatusListener.next(true);
            })
            
        } else {
            this.clearAuthData();
        }
    }

    // sets the timer of the token
    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
    }

    // saving auth data in localstorage
    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
    }

    // clears authdata during logout or token expiration
    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        this.userService.clearUserData();
    }

    // gets authdata if any from localStorage
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