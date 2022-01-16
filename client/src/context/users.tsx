import { useState, createContext, ReactNode } from 'react'

export interface IUsersContext {
  userId: string;
  setUserId: (userId: string) => void;
}

const UsersContext = createContext({} as IUsersContext)

const UsersProvider = (props: { children: ReactNode }) => {
  const [userId, setUserId] = useState("")

  return (
    <UsersContext.Provider value={{ userId, setUserId }}>
      { props.children }
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider } 