import { io } from 'socket.io-client'
import config from '@/config'

class SocketController {
  instance: any;

  constructor() {

    this.instance = io(config.SOCKET_SERVER, {
        auth: {
          token: 'secrettoken'
        }
    })
  }
}

const Socket = new SocketController();

export default Socket;