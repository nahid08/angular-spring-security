import { RxStompConfig } from '@stomp/rx-stomp';

export const myRxStompConfig: RxStompConfig = {
  // Which server?
  brokerURL: 'ws://localhost:9000/socket',

  // Headers
  // Typical keys: login, passcode, host
  
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};