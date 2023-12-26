import { io } from 'socket.io-client'
import config from '@/config'

const Socket = io(config.SOCKET_SERVER, {
  auth: {
    token: 'secrettoken'
  }
})

export default Socket;