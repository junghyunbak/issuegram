import { Menu } from "./_components/Menu";
import { Header } from "./_components/Header";
import { server } from "@/hooks";
import { GridIssues } from "./_components/GridIssues";
import { filterIssues, getIssuesBase64Thumbnail } from "@/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await server.useFetchUserInfo();

  return {
    title: `${user.name}(@${user.login}) • Issuegram 게시물`,
  };
}

export default async function Home() {
  const issues = await server.useFetchIssues();

  const issueNumberToThumbnail = await getIssuesBase64Thumbnail(issues);

  return (
    <div>
      <Header />

      <Menu type="normal" />

      <GridIssues
        issues={filterIssues(issues, "normal")}
        issueNumberToThumbnail={issueNumberToThumbnail}
      />
    </div>
  );
}
