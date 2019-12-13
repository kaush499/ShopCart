import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
 
    constructor(private injector: Injector) {}
 
    handleError(error) {
        console.log("aaff");
    
   }
 
}