// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketService {
//   private socket: WebSocket | undefined;

//   constructor() { }

//   connect(): void {
//     this.socket = new WebSocket('ws://localhost:9000/app');

//     this.socket.onopen = () => {
//       console.log('WebSocket connection established.');
//     };

//     this.socket.onmessage = (event) => {
//       console.log('Received message:', event.data);
//     };

//     this.socket.onclose = (event) => {
//       console.log('WebSocket connection closed:', event);
//     };

//     this.socket.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };
//   }

//   sendMessage(message: string): void {
//     this.socket?.send(message);
//   }

//   closeConnection(): void {
//     this.socket?.close();
//   }
// }