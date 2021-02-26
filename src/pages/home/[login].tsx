import Head from "next/head";

import axios from "axios";

import { GetServerSideProps } from "next";

import { ExperienceBar } from "../../components/ExperienceBar";
import { Profile } from "../../components/Profile";
import { CompletedChallenges } from "../../components/CompletedChallenges";
import { Countdown } from "../../components/Countdown";
import { ChallengeBox } from "../../components/ChallengeBox";

import { Sidebar } from "../../components/Sidebar";

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
