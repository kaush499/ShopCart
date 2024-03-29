import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class UserService {
    private userName: string;
    private isAdmin: boolean = false;
    private userId: number;
    private userStatus = new Subject<string>();

    getUserName() {
        return this.userName;
    }

    getUserId() {
        return this.userId;
    }

    getIsAdmin() {
        return this.isAdmin;
    }

    getUserStatus(){
        return this.userStatus.asObservable();
    }

    // sets the user data after the authentication 
    setUser(userId: number, userName: string, isAdmin: number) {
        this.userId = userId;
        this.userName = userName;
        this.isAdmin = isAdmin == 0 ? false: true;
        this.saveUserData(userId, userName, this.isAdmin);
        this.userStatus.next(userName);
    }

    // saves the user data in the local storage
    saveUserData(userId: number, userName: string, isAdmin: boolean) {
        const adminVal = isAdmin == false ? "false" : "true";
        localStorage.setItem("userId", userId.toString());
        localStorage.setItem("name", userName);
        localStorage.setItem("isAdmin", adminVal);
    }

    // auto sets the user by looking into localstorage and retrieving user data if present 
    autoSetUser() {
        const userName = localStorage.getItem("name");
        const userId = localStorage.getItem("userId");
        const isAdmin = localStorage.getItem("isAdmin");
        this.userName = userName;
        this.userId = Number(userId);
        this.isAdmin = isAdmin == "false" ? false: true;
        this.userStatus.next(userName);
    }

    // clearing user data on logging out
    clearUserData() {
        localStorage.removeItem("name");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
    }
}