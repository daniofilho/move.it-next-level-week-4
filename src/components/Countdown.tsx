import { useMemo, useState, useCallback, useEffect, useContext } from "react";

import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/Countdown.module.css";

let coundtdownTimeout: NodeJS.Timeout;

const defaultTime = 0.1 * 60; //25min

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = useMemo(() => Math.floor(time / 60), [time]);
  const seconds = useMemo(() => time % 60, [time]);

  const [minuteLeft, minuteRight] = useMemo(
    () => String(minutes).padStart(2, "0").split(""),
    [minutes]
  );
  const [secondLeft, secondRight] = useMemo(
    () => String(seconds).padStart(2, "0").split(""),
    [seconds]
  );

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, [setIsActive]);

  const resetCoundtdown = useCallback(() => {
    clearTimeout(coundtdownTimeout);
    setIsActive(false);
    setTime(defaultTime);
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
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button type="button" className={styles.countdownButton} disabled>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={() => resetCoundtdown()}
            >
              Abandonar Ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={() => startCountdown()}
            >
              Iniciar Ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
