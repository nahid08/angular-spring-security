import  { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable } from 'rxjs';


export class HttpRequestInterceptor implements HttpInterceptor {
   
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone(
           {
            withCredentials: true
           })

        return next.handle(req);
    }

}

export const httpInterceptorsProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
]