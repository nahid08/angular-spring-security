import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";



const FILE_API = "http://localhost:9000/profile/image/";

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
export class FileService {

    constructor(private http: HttpClient) {};

    imageUplad(file: any, name: string, id: number) {

        const formData = new FormData();
        formData.append("file", file, name);
        return this.http.post<any>(FILE_API + "upload", formData, {params: {id}});
    }

    getImageFromS3(fileId: number) {
        return this.http.get<any>(FILE_API + "fetch",  {params: {fileId}, headers: httpOptions.headers},);
    }

    pdfDownLoad() {
        return this.http.get("http://localhost:9000/pdf/download", {responseType: 'blob'});
    }
}