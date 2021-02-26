import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import styles from "../styles/components/User.module.css";

interface UserProps {
  position: number;
  login: string;
  level: number;
  experience: number;
  challengesCompleted: number;
}

export function User({
  login,
  position,
  level,
  experience,
  challengesCompleted,
}: UserProps) {
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const getUser = useCallback(async () => {
    const resGithub = await axios.get(`https://api.github.com/users/${login}`);
    const userInfo = resGithub.data;

    setName(userInfo.name);
    setAvatar(userInfo.avatar_url);

    setLoading(false);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.position}>
        <span>{position}</span>
      </div>

      <div className={styles.user}>
        <img
          src={avatar || "/avatar.png"}
          alt={name}
          className={styles.avatar}
        />

        <div>
          <strong>{name || "Usuário"}</strong>
          <p>
            <img src="/icons/level.svg" alt="Level" />
            Level {level}
          </p>
        </div>
      </div>

      <div>
        <p>
          <span>{challengesCompleted}</span> completados
        </p>
      </div>

      <div>
        <p>
          <span>{experience}</span> xp
        </p>
      </div>
    </div>
  );
}
