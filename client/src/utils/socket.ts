import { io } from 'socket.io-client'
import config from '@/config'

const Socket = io(config.SERVER, {
  auth: {
    token: 'secrettoken'
  }
})

export default Socket;