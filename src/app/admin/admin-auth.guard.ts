import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
    
    constructor(private userService: UserService,
                private router: Router) {}

    canActivate(): boolean {
        const isAdmin = this.userService.getIsAdmin();
        if(!isAdmin){
            this.router.navigate(['/']);
        }
        return isAdmin;
    }

}