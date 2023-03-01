import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



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

    constructor(private http: HttpClient) {};

    login(username: string, password: string): Observable<any> {
        return this.http.post(AUTH_API + 'signin', { username, password}, httpOptions)
    }

    register(username: string, email: string, password: string) : Observable<any> {

        return this.http.post(AUTH_API + 'signup', { username, email, password}, httpOptions);
    }
}