import { useMemo, useContext } from "react";

import { CountdownContext } from "../contexts/CountdownContext";

import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCoundtdown,
    startCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = useMemo(
    () => String(minutes).padStart(2, "0").split(""),
    [minutes]
  );
  const [secondLeft, secondRight] = useMemo(
    () => String(seconds).padStart(2, "0").split(""),
    [seconds]
  );

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
