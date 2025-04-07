import io from 'socket.io-client'

const socket = io('http://localhost:4004', { transports: ['websocket'] })

export const subscribeToNotifications = (callback) => {
    socket.off('notification')
    socket.on('notification', (n) => callback(n))
}
