import { createContext, ReactNode } from "react";
import io from "socket.io-client";

const SocketContext = createContext({});

const SocketProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const socket = io({ autoConnect: false })
  return (
    <SocketContext.Provider value={socket}>
        { children }
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider }