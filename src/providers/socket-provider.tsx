"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_SERVER_URL, SOCKET_EVENTS, SOCKET_OPTIONS } from '@/src/constants/socket_constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the context type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

// Create the context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(SOCKET_SERVER_URL, SOCKET_OPTIONS);
    setSocket(socketInstance);

    // Connection event handlers
    socketInstance.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    // Listen for order updated event
    socketInstance.on(SOCKET_EVENTS.ORDER_UPDATED, (data) => {
      toast.info(
        <div>
          <h4 className="font-bold mb-1">تم تحديث طلبك</h4>
          <p>{data.message || 'تم تحديث حالة طلبك. يرجى مراجعة التفاصيل.'}</p>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { direction: 'rtl', textAlign: 'right' }
        }
      );
    });

    // Listen for desk freed event
    socketInstance.on(SOCKET_EVENTS.DESK_FREED, () => {
      toast.success(
        <div>
          <h4 className="font-bold mb-1">شكراً لزيارتكم</h4>
          <p>نأمل أن تكونوا قد استمتعتم بوقتكم معنا. نتطلع لرؤيتكم مرة أخرى قريباً!</p>
        </div>,
        {
          position: "top-right",
          autoClose: 8000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { direction: 'rtl', textAlign: 'right' }
        }
      );
    });

    // Cleanup function
    return () => {
      socketInstance.disconnect();
      socketInstance.off(SOCKET_EVENTS.ORDER_UPDATED);
      socketInstance.off(SOCKET_EVENTS.DESK_FREED);
      socketInstance.off('connect');
      socketInstance.off('disconnect');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
      <ToastContainer />
    </SocketContext.Provider>
  );
}