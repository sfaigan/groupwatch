import { useState, createContext, ReactNode } from "react";

export interface IMainContext {
  name: string;
  groupCode: string;
  setName: (name: string) => void;
  setGroupCode: (groupCode: string) => void;
}

const MainContext = createContext({} as IMainContext);

const MainProvider = (props: { children: ReactNode }) => {
  const [name, setName] = useState("")
  const [groupCode, setGroupCode] = useState("")

  return (
    <MainContext.Provider value={{ name, groupCode, setName, setGroupCode }}>
      { props.children }
    </MainContext.Provider>
  );
}

export { MainContext, MainProvider } 