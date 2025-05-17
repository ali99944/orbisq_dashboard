import { io } from 'socket.io-client';

// Socket server URL (should match the backend socket.io server)
export const SOCKET_SERVER_URL = 'https://server.oorbis.top'; // Update with your actual socket server URL

// Socket event names
export const SOCKET_EVENTS = {
  // Events we listen to (from server)
  ORDER_UPDATED: 'order-updated',
  DESK_FREED: 'desk-freed',
  
  // Events we emit (to server) if needed in the future
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
};

// Socket connection options
export const SOCKET_OPTIONS = {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
};

export const socketInstance = io(SOCKET_SERVER_URL, SOCKET_OPTIONS);