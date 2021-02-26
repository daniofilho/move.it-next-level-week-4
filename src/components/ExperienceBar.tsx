import { useContext, useMemo } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext
  );

  const percentToNextLevel = useMemo(
    () => Math.round((currentExperience * 100) / experienceToNextLevel),
    [currentExperience, experienceToNextLevel]
  );

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel || 0}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel || 0}%` }}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
