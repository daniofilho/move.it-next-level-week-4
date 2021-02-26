import Link from "next/link";

import { useRouter } from "next/router";

import styles from "../styles/components/Sidebar.module.css";

export function Sidebar() {
  const router = useRouter();

  return (
    <nav className={styles.container}>
      <div>
        <img src="/logo-icon.png" alt="Move.it" />
      </div>

      <div>
        <span className={router.route === "/home/[login]" ? styles.active : ""}>
          <Link href="/">
            <img
              src={
                router.route === "/home/[login]"
                  ? "/icons/house-active.svg"
                  : "/icons/house.svg"
              }
              alt="Home"
            />
          </Link>
        </span>

        <Link href="/ranking">
          <span className={router.route === "/ranking" ? styles.active : ""}>
            <img
              src={
                router.route === "/ranking"
                  ? "/icons/medal-active.svg"
                  : "/icons/medal.svg"
              }
              alt="Ranking"
            />
          </span>
        </Link>
      </div>

      <div />
    </nav>
  );
}
