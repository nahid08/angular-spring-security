import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


const AUTH_API = "http://localhost:9000/";
@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) {}

    getAllUser() {
        return this.http.get(AUTH_API + "admin/allusers");
    }
}