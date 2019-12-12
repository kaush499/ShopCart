import { CanActivate,
         Router,
         ActivatedRouteSnapshot, 
         RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService,
                private router: Router) {}
    
    // activates certain routes only if user is authenticated

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        const isAuth = this.authService.getIsAuth();
        if(isAuth === false){
            this.router.navigate(['/login'],{queryParams: {"redirectUrl": state.url}});
        }
        return isAuth;
    }            

}