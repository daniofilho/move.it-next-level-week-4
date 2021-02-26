import Head from "next/head";

import axios from "axios";

import { GetServerSideProps } from "next";

import { ExperienceBar } from "../../src/components/ExperienceBar";
import { Profile } from "../../src/components/Profile";
import { CompletedChallenges } from "../../src/components/CompletedChallenges";
import { Countdown } from "../../src/components/Countdown";
import { ChallengeBox } from "../../src/components/ChallengeBox";

import { Sidebar } from "../../src/components/Sidebar";

import { CountdownProvider } from "../../src/contexts/CountdownContext";
import { ChallengesProvider } from "../../src/contexts/ChallengesContexts";

import styles from "../../src/styles/pages/Home.module.css";

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

      <Sidebar />
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  try {
    // Get Github information
    const { login } = ctx.params;

    const resGithub = await axios.get(`https://api.github.com/users/${login}`);
    const userInfo = resGithub.data;

    // Get API information
    const resInfo = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${login}`
    );
    const userData = resInfo.data;

    // Return
    return {
      props: {
        userLogin: login,
        userName: userInfo.name ?? login,
        userAvatar: userInfo.avatar_url ?? "/avatar.png",
        level: userData?.data?.level ?? 0,
        currentExperience: userData?.data?.experience ?? 0,
        challengesCompleted: userData?.data?.challengesCompleted ?? 0,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
