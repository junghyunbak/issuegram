import { Menu } from "./_components/Menu";
import { Header } from "./_components/Header";
import { server } from "@/hooks";
import { GridIssues } from "./_components/GridIssues";
import { omitIssuesWithLabel } from "@/utils";
import config from "@/config";
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

      <Menu type="게시물" />

      <GridIssues
        issues={omitIssuesWithLabel(
          issues,
          config.github.issues.portfolioLabel,
        )}
      />
    </div>
  );
}
