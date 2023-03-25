// import { Injectable } from "@angular/core";


// export interface Document {
//     name: string,
//     message: string
// }


// @Injectable({
//     providedIn: 'root'
// })
// export class WebSocketService {

//     stompClient: any;
//     msg: any;

//     constructor() {
//         this.initializeWebSocketConnection();
//     }

//     initializeWebSocketConnection() {
//         const serverUrl = 'http//localhost:8081/socket';
//         var sock = new any('https://mydomain.com/my_prefix');
//         this.stompClient = stompc.over(ws);
//         const that = this;
//         this.stompClient.connect({}, (frame: any) => {
//             this.stompClient.subscribe('/message', (message: any) => {
//                 if(message.body) {
//                     that.msg.push(message.body);
//                 }
//             })
//         })
//     }


//     sendMessage(message) {
//         this.stompClient.send("/app/send/message", {}, message);
//     }

// }