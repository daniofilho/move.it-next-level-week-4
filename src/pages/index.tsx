import { useCallback, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/pages/Login.module.css";

export default function Login() {
  const router = useRouter();

  const [login, setLogin] = useState("");

  const handleLogin = useCallback(() => {
    if (login && login !== "") {
      router.push(`/home/${login}`);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | Move.it</title>
      </Head>

      <article>
        <aside>
          <img src="/logo.png" alt="move.it" />

          <h1>Bem-vindo</h1>

          <p>
            <img src="/github-icon.png" alt="Github" />
            Digite o seu usuário no Github para começar
          </p>

          <footer>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
              <img src="/arrow-right.png" alt="Entrar" />
            </button>
          </footer>
        </aside>
      </article>
    </div>
  );
}
