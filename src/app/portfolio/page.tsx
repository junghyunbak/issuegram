import { Menu } from "../_components/Menu";
import { Header } from "../_components/Header";
import { GridIssues } from "../_components/GridIssues";
import { server } from "@/hooks";
import config from "@/config";
import { pickIssuesWithLabel } from "@/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await server.useFetchUserInfo();

  return {
    title: `${user.name}(@${user.login}) • Issuegram 포트폴리오`,
  };
}

export default async function Portfolio() {
  const issues = await server.useFetchIssues();

  return (
    <div>
      <Header />

      <Menu type="포트폴리오" />

      <GridIssues
        issues={pickIssuesWithLabel(
          issues,
          config.github.issues.portfolioLabel,
        )}
      />
    </div>
  );
}
