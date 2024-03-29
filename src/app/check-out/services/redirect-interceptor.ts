import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class RedirectInterceptor implements HttpInterceptor {
    constructor(@Inject(DOCUMENT) private document: Document) {}

    // intercepts all the http requests and attatches token in its header
    intercept(req: HttpRequest<any>, next: HttpHandler) {
       return next.handle(req).pipe(
           map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if(event.headers.has('x-redirect')){
                    const url = event.headers.get('x-redirect');
                    this.document.location.href = url;
                }
              }
              return event;
           })
       )
    }
}