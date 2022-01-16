import { createContext, ReactNode, useState } from "react";
import { Movie } from "../hooks/useMovie";

export interface IResultContext {
  result: Movie;
  setResult: (result: Movie) => void;
}

const ResultContext = createContext({} as IResultContext);

const ResultProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState({} as Movie);

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      { children }
    </ResultContext.Provider>
  );
}

export { ResultContext, ResultProvider } 