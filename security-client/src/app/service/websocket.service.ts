import { Injectable } from "@angular/core";
import { map, Observable, Observer } from "rxjs";
import { AnonymousSubject, Subject } from "rxjs/internal/Subject";

export interface Message {
    name: string;
    message: string;
}


const CHAT_URL = "ws://localhost:8000/api/greetings";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
     subject?: AnonymousSubject<MessageEvent>;
     message?: Subject<Message>;

     constructor() {
        this.message = <Subject<Message>>this.connect(CHAT_URL).pipe(
            map(
                (response: MessageEvent): Message => {
                    console.log(response.data)
                    let data = JSON.parse(response.data);
                    return data;
                }
            )
        )
     }

     connect(url: string): AnonymousSubject<MessageEvent> {
        if(!this.subject) {
            this.subject = this.create(url);
        }

        return this.subject;
     }

     private create(url: string): AnonymousSubject<MessageEvent> {
        let ws = new WebSocket(url);
        let observable = new Observable((obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs)
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        })

        let observer = {
            error: null,
            complete: null,
            next: (data: Object) => {
                console.log('Message sent to websocket');
                if(ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        }

        return new AnonymousSubject<MessageEvent>(observer as any, observable);
     }
 
}