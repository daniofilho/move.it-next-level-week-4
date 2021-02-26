import Head from "next/head";

import axios from "axios";

import { GetServerSideProps } from "next";

import { ExperienceBar } from "../../components/ExperienceBar";
import { Profile } from "../../components/Profile";
import { CompletedChallenges } from "../../components/CompletedChallenges";
import { Countdown } from "../../components/Countdown";
import { ChallengeBox } from "../../components/ChallengeBox";

import { CountdownProvider } from "../../contexts/CountdownContext";
import { ChallengesProvider } from "../../contexts/ChallengesContexts";

import styles from "../../styles/pages/Home.module.css";

interface HomeProps {
  userLogin: string;
  userName: string;
  userAvatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({ ...rest }: HomeProps) {
  return (
    <ChallengesProvider data={{ ...rest }}>
      <div className={styles.container}>
        <Head>
          <title>Início | Move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  const { login } = ctx.params;

  const res = await axios.get(`https://api.github.com/users/${login}`);
  const user = res.data;

  // @TODO - tratar url inexistente

  return {
    props: {
      userLogin: login,
      userName: user.name || login,
      userAvatar: user.avatar_url || "/avatar.png",
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
