import { createContext, ReactNode } from "react";
import io from "socket.io-client";

const SocketContext = createContext({});
const socket = io({ autoConnect: false });

const SocketProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <SocketContext.Provider value={socket}>
        { children }
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider }