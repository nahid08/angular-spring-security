import { InjectionToken } from "@angular/core";



export const URL_CONFIG_TOKEN = new InjectionToken<any>('TOKEN FOR HTTP CALL',);


export interface UrlConfig {
    url: string
}


export const urlProvider = [{provide: URL_CONFIG_TOKEN, useValue: {url:"http://localhost:9000/api/auth/"}}];