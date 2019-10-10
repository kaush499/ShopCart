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

    setUser(userId: number, userName: string, isAdmin: boolean) {
        this.userId = userId;
        this.userName = userName;
        this.isAdmin = isAdmin;
        this.saveUserData(userId, userName, isAdmin);
        this.userStatus.next(userName);
    }

    saveUserData(userId: number, userName: string, isAdmin: boolean) {
        const adminVal = isAdmin == false ? "false" : "true";
        localStorage.setItem("UserId", userId.toString());
        localStorage.setItem("name", userName);
        localStorage.setItem("isAdmin", adminVal);
    }

    autoSetUser() {
        const userName = localStorage.getItem("name");
        const userId = localStorage.getItem("userId");
        const isAdmin = localStorage.getItem("isAdmin");
        this.userName = userName;
        this.userId = Number(userId);
        this.isAdmin = isAdmin == "false" ? false: true;
        this.userStatus.next(userName);
    }

    clearUserData() {
        localStorage.removeItem("name");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
    }
}