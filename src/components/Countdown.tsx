import { useMemo, useState, useCallback, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const [time, setTime] = useState(25 * 60); //25min
  const [active, setActive] = useState(false); //25min

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
    setActive(true);
  }, [setActive]);

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      setActive(false);
    }
  }, [active, setTime, time]);

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

      <button
        type="button"
        className={styles.countdownButton}
        onClick={() => startCountdown()}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
}
