import { useState, createContext, ReactNode } from 'react'

interface User {
  name: string;
  groupId: string;
  streamingServices?: number[];
  genres?: number[];
}

export interface IUsersContext {
  users: { [id: string]: User };
  setUsers: (users: { [id: string]: User }) => void;
}

const UsersContext = createContext({} as IUsersContext)

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState({} as { [id: string]: User });

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      { children }
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider } 