import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 406 || err.status === 407) {
                // auto logout if 401 response returned from api
                this.authService.addsmsWarn("Sesión Expirada! Acceda al sistema nuevamente")
                this.authService.logout();
                //location.reload(true);
            }
            else if(err.status== 402) this.authService.addsmsInfo("Credenciales no validas");
            else if(err.status== 500) this.authService.addsmsError(err.error.error);
            else this.authService.ErrorServer();
            const error = err.error.error || err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}