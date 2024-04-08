import { Menu } from "./_components/Menu";
import { Header } from "./_components/Header";
import { server } from "@/hooks";
import { GridIssues } from "./_components/GridIssues";
import { filterIssues } from "@/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await server.useFetchUserInfo();

  return {
    title: `${user.name}(@${user.login}) • Issuegram 게시물`,
  };
}

export default async function Home() {
  const issues = await server.useFetchIssues();

  return (
    <div>
      <Header />

      <Menu type="normal" />

      <GridIssues issues={filterIssues(issues, "normal")} />
    </div>
  );
}
