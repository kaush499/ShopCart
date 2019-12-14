import { ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
 
@Injectable({providedIn: "root"})
export class GlobalErrorHandlerService implements ErrorHandler {
 
    constructor(private injector: Injector,
                private  zone: NgZone) {}
 
    handleError(error: any) {
        const router = this.injector.get(Router);
        console.log(error);
        if (!(Error instanceof HttpErrorResponse)) {
         this.zone.run(() =>  router.navigate(['error']));
        }
        
    }
}