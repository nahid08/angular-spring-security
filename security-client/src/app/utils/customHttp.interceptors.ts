import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { SpinnerService } from "../service/spinner.service";

@Injectable()
export class CustomHttpInterceptors implements HttpInterceptor {

    constructor(private spinnerService: SpinnerService) {};

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinnerService.show();
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if(event instanceof HttpResponse) {
                this.spinnerService.hide();
            }
        },
        (error: any) => {
            this.spinnerService.hide();
        }))
    }
}


