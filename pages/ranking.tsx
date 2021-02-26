import Head from "next/head";

import axios from "axios";

import { GetServerSideProps } from "next";

import { Sidebar } from "../src/components/Sidebar";
import { User } from "../src/components/User";

import styles from "../src/styles/pages/Ranking.module.css";

interface User {
  login: string;
  level: number;
  experience: number;
  challengesCompleted: number;
}

interface RankingProps {
  users: Array<User>;
}

export default function Ranking({ users }: RankingProps) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Ranking | Move.it</title>
        </Head>

        <h1>Ranking</h1>

        <div className={styles.table}>
          <div>
            <div>
              <strong>Posição</strong>
            </div>

            <div>
              <strong>Usuário</strong>
            </div>

            <div>
              <strong>Desafios</strong>
            </div>

            <div>
              <strong>Experiência</strong>
            </div>
          </div>

          {users &&
            users.map((user, index) => {
              return <User key={index} position={index + 1} {...user} />;
            })}
        </div>
      </div>

      <Sidebar />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Get API information
    const resInfo = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    const users = resInfo.data;

    // Return
    return {
      props: {
        users: users.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
