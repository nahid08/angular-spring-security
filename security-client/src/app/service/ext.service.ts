import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { URL_CONFIG_TOKEN, UrlConfig } from "../utils/token/config";


const FILE_API = "http://localhost:9000/sms";
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
export class ExtService {

    constructor(private http: HttpClient, @Inject(URL_CONFIG_TOKEN) private urlObj: UrlConfig) {};


    sendSms() {
        return this.http.get<string>(FILE_API + '/send');
    }

}