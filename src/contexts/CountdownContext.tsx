import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { ChallengesContext } from "./ChallengesContexts";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  resetCoundtdown: () => void;
  startCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let coundtdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const defaultTime = 0.1 * 60; //25min

  const [time, setTime] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = useMemo(() => Math.floor(time / 60), [time]);
  const seconds = useMemo(() => time % 60, [time]);

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, [setIsActive]);

  const resetCoundtdown = useCallback(() => {
    clearTimeout(coundtdownTimeout);
    setIsActive(false);
    setTime(defaultTime);
    setHasFinished(false);
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      coundtdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, setTime, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        resetCoundtdown,
        startCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
