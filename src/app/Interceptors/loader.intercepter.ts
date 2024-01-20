import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType
} from '@angular/common/http';

import { Observable, tap } from 'rxjs'; 
import { NgxSpinnerService } from 'ngx-spinner';

/** Pass untouched request through to the next request handler. */
@Injectable()

export class LoaderIntercepter implements HttpInterceptor {

constructor(private loader:NgxSpinnerService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event=>{
        this.loader.show()
        if(event.type == HttpEventType.Response){
          if(event.status == 200){
            this.loader.hide()
          }
        }
      })
    );
  }
}