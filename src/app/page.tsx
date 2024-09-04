import { Metadata } from "next";

import { Menu } from "./_components/Menu";
import { Header } from "./_components/Header";
import { HomeIssuesLoader } from "./_components/HomeIssuesLoader";

import { getUserInfo } from "@/api";

export async function generateMetadata(): Promise<Metadata> {
  const { user } = await getUserInfo();

  return {
    title: `${user.name}(@${user.login}) • Issuegram 게시물`,
  };
}

export default async function Home() {
  return (
    <div>
      <Header />

      <Menu type="normal" />

      <HomeIssuesLoader />
    </div>
  );
}
