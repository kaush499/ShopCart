import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse
  } from "@angular/common/http";
  import { catchError } from "rxjs/operators";
  import { throwError } from "rxjs";
  import { Injectable } from "@angular/core";
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  
  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
  
    constructor(private modalService: NgbModal) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = "An unknown error occurred!";
          if (error.error.message) {
            errorMessage = error.error.message;
          }
          const modalRef = this.modalService.open(ErrorModalComponent);
          modalRef.componentInstance.errorMessage = errorMessage;
          return throwError(error);
        })
      );
    }
  }