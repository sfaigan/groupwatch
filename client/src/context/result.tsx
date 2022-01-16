import { createContext, ReactNode, useState } from "react";
import { Movie } from "../hooks/useMovie";

export interface Provider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface IResultContext {
  result: Movie;
  setResult: (result: Movie) => void;
  providers: Provider[];
  setProviders: (providers: Provider[]) => void;
}

const ResultContext = createContext({} as IResultContext);

const ResultProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState({} as Movie);
  const [providers, setProviders] = useState([] as Provider[]);

  return (
    <ResultContext.Provider value={{ result, setResult, providers, setProviders }}>
      { children }
    </ResultContext.Provider>
  );
}

export { ResultContext, ResultProvider } 