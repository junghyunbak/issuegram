import { Menu } from "../_components/Menu";
import { Header } from "../_components/Header";
import { GridIssues } from "../_components/GridIssues";
import { server } from "@/hooks";
import { filterIssues } from "@/utils";
import { Metadata } from "next";
import { getIssuesBase64Thumbnail } from "@/utils";

export async function generateMetadata(): Promise<Metadata> {
  const user = await server.useFetchUserInfo();

  return {
    title: `${user.name}(@${user.login}) • Issuegram 포트폴리오`,
  };
}

export default async function Portfolio() {
  const issues = await server.useFetchIssues();

  const issueNumberToThumbnail = await getIssuesBase64Thumbnail(issues);

  return (
    <div>
      <Header />

      <Menu type="portfolio" />

      <GridIssues
        issues={filterIssues(issues, "portfolio")}
        issueNumberToThumbnail={issueNumberToThumbnail}
      />
    </div>
  );
}
