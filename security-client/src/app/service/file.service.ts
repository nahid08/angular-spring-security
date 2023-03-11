import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



const FILE_API = "http://localhost:9000/profile/image/";


@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) {};

    imageUplad(file: any) {

        const formData = new FormData();
        formData.append("file", file, file.name);
        return this.http.post<any>(FILE_API + "upload", formData);
    }
}