// src/providers/socket-provider.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { SOCKET_EVENTS, socketInstance } from '../constants/socket_constants';

// Define context types
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

// Create context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

// Custom hook to use socket context
export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    
    setSocket(socketInstance);

    // Connection event handlers
    socketInstance.on(SOCKET_EVENTS.CONNECT, () => {
      console.log('Socket connected');
      setIsConnected(true);
    });

    socketInstance.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on(SOCKET_EVENTS.CONNECT_ERROR, (error: string) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance.off(SOCKET_EVENTS.CONNECT);
        socketInstance.off(SOCKET_EVENTS.DISCONNECT);
        socketInstance.off(SOCKET_EVENTS.CONNECT_ERROR);
        socketInstance.off(SOCKET_EVENTS.DESK_FREED);
        socketInstance.off(SOCKET_EVENTS.ORDER_UPDATED);
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;