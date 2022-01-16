import { useState, createContext, ReactNode } from "react";

export interface IMainContext {
  groupCode: string;
  setGroupCode: (groupCode: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  name: string;
  setName: (name: string) => void;
  streamingServices: number[];
  setStreamingServices: (streamingServices: number[]) => void;
  genres: number[];
  setGenres: (genres: number[]) => void;
  isHost: boolean;
  setIsHost: (isHost: boolean) => void;
}

const MainContext = createContext({} as IMainContext);

const MainProvider = ({ children }: { children: ReactNode }) => {
  const [groupCode, setGroupCode] = useState("")
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [streamingServices, setStreamingServices] = useState([] as number[]);
  const [genres, setGenres] = useState([] as number[]);
  const [isHost, setIsHost] = useState(false);

  return (
    <MainContext.Provider value={{ groupCode, setGroupCode, userId, setUserId, name, setName, streamingServices, setStreamingServices, genres, setGenres, isHost, setIsHost}}>
      { children }
    </MainContext.Provider>
  );
}

export { MainContext, MainProvider } 