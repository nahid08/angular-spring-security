import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UrlConfig, URL_CONFIG_TOKEN } from "../utils/token/config";


const AUTH_API = "http://localhost:9000/api/auth/";
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:9000',
    'Access-Control-Allow-Credentials': "true",
    'Access-Control-Allow-Headers': 'Content-Type',
    }),
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, @Inject(URL_CONFIG_TOKEN) private urlObj: UrlConfig ) {};

    login(username: string, password: string): Observable<any> {
        return this.http.post(this.urlObj.url + 'signin', { username, password}, httpOptions)
    }

    register(username: string, email: string, password: string, role: string[]) : Observable<any> {

        return this.http.post(this.urlObj.url + 'signup', { username, email, password, role}, httpOptions);
    }

    logout(): Observable<any> {
        return this.http.post(this.urlObj.url + 'signout', {}, httpOptions);
    }
}