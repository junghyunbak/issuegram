import { Menu } from "./_components/Menu";
import { Header } from "./_components/Header";
import { server } from "@/hooks";
import { Metadata } from "next";
import { HomeIssuesLoader } from "./_components/HomeIssuesLoader";

export async function generateMetadata(): Promise<Metadata> {
  const user = await server.useFetchUserInfo();

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
