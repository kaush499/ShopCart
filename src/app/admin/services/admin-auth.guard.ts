import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';


@Injectable()
export class AdminAuthGuard implements CanActivate {
    
    constructor(private userService: UserService,
                private router: Router) {}

    // For allowing only admins to certain pages            
    canActivate(): boolean {
        const isAdmin = this.userService.getIsAdmin();
        if(!isAdmin){
            this.router.navigate(['/']);
        }
        return isAdmin;
    }

}