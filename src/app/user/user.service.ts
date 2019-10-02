import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class UserService {
    private userName: string;
    private isAdmin: boolean = false;
    private userId: number

    getUserName() {
        return this.userName;
    }

    getUserId() {
        return this.userId;
    }

    getIsAdmin() {
        return this.isAdmin;
    }

    setUser(userId: number, userName: string, isAdmin: boolean) {
        this.userId = userId;
        this.userName = userName;
        this.isAdmin = isAdmin;
        this.saveUserData(userId, userName, isAdmin);
    }

    saveUserData(userId: number, userName: string, isAdmin: boolean) {
        const adminVal = isAdmin == false ? "false" : "true";
        localStorage.setItem("UserId", userId.toString());
        localStorage.setItem("name", name);
        localStorage.setItem("isAdmin", adminVal);
    }

    autoSetUser() {
        const userName = localStorage.getItem("name");
        const userId = localStorage.getItem("userId");
        const isAdmin = localStorage.getItem("isAdmin");
        this.userName = userName;
        this.userId = Number(userId);
        this.isAdmin = isAdmin == "false" ? false: true;
    }

    clearUserData() {
        localStorage.removeItem("name");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
    }
}