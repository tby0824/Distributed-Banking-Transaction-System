import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Mock for now, backend later

export const subscribeToNotifications = (callback) => {
  setTimeout(() => callback('Transaction completed (mock)'), 2000); // Simulate notification
  // socket.on('notification', callback); // Uncomment when backend is ready
};