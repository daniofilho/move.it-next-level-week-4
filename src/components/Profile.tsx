import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level, userAvatar, userName } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src={userAvatar} alt={userName} />

      <div>
        <strong>{userName}</strong>
        <p>
          <img src="/icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
